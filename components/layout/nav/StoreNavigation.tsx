import { useState } from "react";

import NavSmall from "./NavSmall";
import NavLarge from "./NavLarge";

export default function StoreNavigation({ user, session }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-grim z-0">
      <NavSmall open={open} setOpen={setOpen} session={session} user={user} />
      <NavLarge open={open} setOpen={setOpen} session={session} user={user} />
    </div>
  );
}
