import { signIn, signOut } from "next-auth/client";
import s from "../../styles/banners/SessionBanner.module.scss";

const SessionBanner = ({ session }: any) => {
  return (
    <div className={s.sessionmodule}>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default SessionBanner;
