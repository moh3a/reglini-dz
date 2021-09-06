import StoreNavigation from "./nav/StoreNavigation";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <StoreNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
