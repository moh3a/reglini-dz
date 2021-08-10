import { useState } from "react";

import Navbar from "./Navbar";

const Nav = () => {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <>
      <Navbar show={sideToggle} click={() => setSideToggle(true)} />
    </>
  );
};

export default Nav;
