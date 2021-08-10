import { useRouter } from "next/router";
import Link from "next/link";

import s from "../../styles/layout/Footer.module.scss";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className={s.footer}>
      <div className={s.info}>
        <div className={s.pp}>
          <Link href="/pp">Privacy Policy</Link>
        </div>
        <div className={s.tos}>
          <Link href="/tos">Terms of Service</Link>
        </div>
        <div className={s.copyright}>&copy; 2021.</div>
      </div>
      <div className={s.language}>
        <p>Select language: </p>
        <ul>
          {router.locales?.map((locale) => (
            <li key={locale}>
              <Link href={router.asPath} locale={locale}>
                {locale}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
