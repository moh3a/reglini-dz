import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
