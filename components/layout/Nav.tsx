import { useState } from "react";

import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import Backdrop from "./Backdrop";

const Nav = () => {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <>
      <Navbar show={sideToggle} click={() => setSideToggle(true)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <Sidenav show={sideToggle} click={() => setSideToggle(false)} />
    </>
  );
};

export default Nav;
