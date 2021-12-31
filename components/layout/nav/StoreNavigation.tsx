import { useState } from "react";

import NavSmall from "./NavSmall";
import NavLarge from "./NavLarge";

export default function StoreNavigation({ placeholder, user }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-grim z-0">
      <NavSmall
        open={open}
        setOpen={setOpen}
        user={user}
        placeholder={placeholder}
      />
      <NavLarge setOpen={setOpen} user={user} placeholder={placeholder} />
    </div>
  );
}
