import LogoMini from "../components/layout/LogoMini";
import s from "../styles/screens/HomeScreen.module.scss";

const HomeScreen = () => {
  return (
    <div className={s.homescreen}>
      <LogoMini />
      <div>reglini.dz is currently under development.</div>
    </div>
  );
};

export default HomeScreen;
