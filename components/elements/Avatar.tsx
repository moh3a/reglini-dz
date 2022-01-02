/* eslint-disable @next/next/no-img-element */
import parse from "html-react-parser";

const Avatar = ({
  picture,
  size,
}: {
  picture: any;
  size?: "sm" | "md" | "lg";
}) => {
  let avatarSize = "h-10 w-10";
  let height = 30;
  let width = 30;
  if (size === "md") {
    avatarSize = "h-20 w-20";
    height = 60;
    width = 60;
  } else if (size === "lg") {
    avatarSize = "h-40 w-40";
    height = 100;
    width = 100;
  } else {
    avatarSize = "h-10 w-10";
    height = 30;
    width = 30;
  }

  return (
    <>
      {picture.includes("<svg ") ? (
        <div className={`${avatarSize} rounded-full`}>{parse(picture)}</div>
      ) : (
        <img
          className={`${avatarSize} rounded-full`}
          src={picture ? picture : "/user-icon.png"}
          alt={"user profile image"}
        />
      )}
    </>
  );
};

export default Avatar;
