import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import PageDetails from "../../../components/meta_ads/PageDetails";
import { IFacebookPage } from "../../../types";
import { selectUser } from "../../../utils/redux/userSlice";

const FacebookPageDetails = () => {
  const [page, setPage] = useState<IFacebookPage>();
  const router = useRouter();
  const { id } = router.query;
  const { user, status } = useSelector(selectUser);

  useEffect(() => {
    if (status === "complete" && !user) router.replace("/meta-ads");
  }, [user, status, router]);

  useEffect(() => {
    if (status === "complete") {
      if (id && user && user.facebookPages) {
        const index = user.facebookPages.findIndex(
          (page: any) => page.page_id === id
        );
        if (index === -1) {
          router.replace("/meta-ads");
        } else {
          setPage(user.facebookPages[index]);
        }
      } else {
        router.replace("/meta-ads");
      }
    }
  }, [status, id, user, router]);

  return (
    <>
      <Head>
        <title>{page && `${page.page_name} | `} Meta Ads | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {page && <PageDetails page={page} />}
    </>
  );
};

import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
FacebookPageDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default FacebookPageDetails;
