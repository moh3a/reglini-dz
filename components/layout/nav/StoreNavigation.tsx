import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Logo from "../Logo";
import NavSmall from "./NavSmall";
import NavLarge from "./NavLarge";

export default function StoreNavigation() {
  const [session, loading] = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      {loading ? (
        <div className="pb-4 bg-white dark:bg-grim w-full z-0 flex justify-center">
          <Link href="/" passHref>
            <>
              <span className="sr-only">reglini.dz</span>
              <Logo width="50" height="50" />
            </>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-grim z-0">
          <NavSmall open={open} setOpen={setOpen} session={session} />
          <NavLarge open={open} setOpen={setOpen} session={session} />
        </div>
      )}
    </>
  );
}
