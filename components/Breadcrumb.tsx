import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü");
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([
    { href: "", breadcrumb: "" },
  ]);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        let url = path;
        if (path === "aliexpress") url = "search aliexpress";
        if (path === "currency") url = "currency exchange";
        return {
          breadcrumb: url,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });
      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <>
      {breadcrumbs.length !== 0 ? (
        <nav aria-label="container">
          <ol className="list-reset py-4 pl-4 rounded flex bg-grey-light text-grey">
            <Link href="/" passHref>
              <a className="px-2 text-indigo underline">home</a>
            </Link>{" "}
            &gt;
            <span>
              {breadcrumbs.map((breadcrumb, i) => {
                return (
                  <Fragment key={breadcrumb.href}>
                    <Link href={breadcrumb.href}>
                      <a
                        className={`${
                          i === breadcrumbs.length - 1
                            ? "no-underline cursor-default"
                            : "underline"
                        } px-2 text-indigo `}
                      >
                        {convertBreadcrumb(breadcrumb.breadcrumb)}
                      </a>
                    </Link>
                    {i === breadcrumbs.length - 1 ? "" : <>&gt;</>}
                  </Fragment>
                );
              })}
            </span>
          </ol>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Breadcrumbs;
