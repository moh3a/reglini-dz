import { useState } from "react";

import Appbar from "./Appbar";
// import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import Backdrop from "./Backdrop";

const Nav = () => {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <>
      <Appbar />
      {/* <Navbar show={sideToggle} click={() => setSideToggle(true)} /> */}
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <Sidenav show={sideToggle} click={() => setSideToggle(false)} />
    </>
  );
};

export default Nav;
