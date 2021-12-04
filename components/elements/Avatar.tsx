import parse from "html-react-parser";
import Image from "next/image";

const Avatar = ({ user, size }: { user: any; size?: "sm" | "md" | "lg" }) => {
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
      {user && user.picture && user.picture.includes("<svg ") ? (
        <div className={`${avatarSize} rounded-full`}>
          {parse(user.picture)}
        </div>
      ) : (
        <Image
          className={`${avatarSize} rounded-full`}
          src={user && user.picture ? user.picture : "/user-icon.png"}
          alt={user && user.name ? user.name : "user profile image"}
          height={height}
          width={width}
        />
      )}
    </>
  );
};
export default Avatar;
