import StoreNavigation from "./StoreNavigation";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <>
      <StoreNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
