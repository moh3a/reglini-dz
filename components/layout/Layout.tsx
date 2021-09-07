import StoreNavigation from "./nav/StoreNavigation";
import Footer from "./Footer";
import { ReactNode } from "react";
import Breadcrumbs from "../Breadcrumb";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <StoreNavigation />
      <Breadcrumbs />
      <main>{children}</main>
      <Footer />
    </>
  );
}
