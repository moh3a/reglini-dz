import { useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import axios from "axios";
import { useTranslations } from "next-intl";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";

import AlertMessage from "../elements/AlertMessage";
import Avatar from "../elements/Avatar";
import { generateRandomString } from "../../utils/methods";

const ProfilePicture = ({
  user,
  size,
}: {
  user: any;
  size?: "sm" | "md" | "lg";
}) => {
  const t = useTranslations("Profile");
  const [pp, setPp] = useState("");
  const [generated, setGenerated] = useState("");
  const [image, setImage] = useState<any>();
  const [createObjectURL, setCreateObjectURL] = useState<string>();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event: any) => {
    const body = new FormData();
    body.append("file", image);
    const { data } = await axios.post("/api/users/updatepicture", body);
    if (data.success) {
      setSuccess(data.message);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } else {
      setError(data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const generateAvatar = () => {
    let str = generateRandomString(6);
    let svg = createAvatar(style, {
      seed: str,
    });
    setGenerated(svg);
  };

  const saveAvatar = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.post("/api/users/updatepicture", {
      picture: generated,
    });
    if (data.success) {
      setSuccess(data.message);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } else {
      setError(data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    setGenerated("");
  };

  return (
    <>
      {success && <AlertMessage type="success" message={success} />}
      {error && <AlertMessage type="error" message={error} />}
      <div className="w-full flex flex-col">
        <div
          onClick={() => setPp("upload")}
          className={`${
            pp === "upload" ? "underline text-indigo-900" : ""
          } py-2 cursor-pointer hover:underline`}
        >
          {t("uploadPp")}
        </div>
        <div
          onClick={() => {
            setPp("avatar");
            generateAvatar();
          }}
          className={`${
            pp === "avatar" ? "underline text-indigo-900" : ""
          } py-2 cursor-pointer hover:underline`}
        >
          {t("generateAvatar")}
        </div>
        {pp && (
          <div className="flex flex-row">
            <div className="mx-4 flex flex-col my-1">
              <button
                onClick={() => setPp("")}
                className="p-1 my-1 bg-gray-500 text-yellow-100 rounded-md"
              >
                {t("cancel")}
              </button>
              {pp === "avatar" && (
                <button
                  onClick={generateAvatar}
                  className="p-1 my-1 bg-gray-500 text-yellow-100 rounded-md"
                >
                  {t("change")}
                </button>
              )}
              {pp === "upload" && (
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={uploadToClient}
                />
              )}
              <button
                className="p-1 my-1 bg-red-500 text-yellow-100 rounded-md"
                onClick={(e) => {
                  pp === "avatar"
                    ? saveAvatar(e)
                    : pp === "upload"
                    ? uploadToServer(e)
                    : "";
                }}
              >
                {t("save")}
              </button>
            </div>
            <div className="h-40 w-40">
              {pp === "avatar" && parse(generated)}
            </div>
            <div className="h-40 w-40">
              {pp === "upload" && createObjectURL && (
                <Image
                  loader={() => createObjectURL}
                  src={createObjectURL}
                  alt=""
                  width={50}
                  height={50}
                  layout="responsive"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="py-2">{!pp && <Avatar user={user} size={size} />}</div>
    </>
  );
};

export default ProfilePicture;
