/* eslint-disable @next/next/no-img-element */
import { TrashIcon } from "@heroicons/react/outline";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteFacebookPageAccess,
  validateFacebookPageAccess,
} from "../../utils/redux/userAsyncActions";
import { selectUser } from "../../utils/redux/userSlice";
import { IFacebookPage } from "../../utils/types";

const MetaAdsScreen = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const deletePageAccess = (id: string) => {
    dispatch(deleteFacebookPageAccess({ pageId: id }));
  };

  const validatePageAccess = (id: string) => {
    dispatch(validateFacebookPageAccess({ pageId: id }));
  };

  return (
    <>
      <Head>
        <title>Coming soon | Meta Ads | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center w-full bg-gray-100 dark:bg-gray-700">
        <div className="h-28 w-28 lg:h-60 lg:w-60 select-none">
          <img src="/meta-icon.png" alt="meta logo" />
        </div>
        {user ? (
          <div className="mt-10 w-full">
            <div className="flex flex-col text-center md:text-left md:flex-row md:justify-between">
              <div>Demand an access request to your Facebook page...</div>
              <div>
                <Link href="/meta-ads/access_request" passHref>
                  <button className="px-4 py-1 bg-facebook text-white rounded-lg cursor-pointer">
                    Demand
                  </button>
                </Link>
              </div>
            </div>
            <h2 className="text-lg font-bold">Facebook pages</h2>
            <div className="mx-1  flex border-b border-black bg-gray-200 dark:bg-gray-800">
              <div className="w-10 text-center font-bold border-r border-black overflow-hidden">
                d
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Page name
              </div>
              <div className="w-96 text-center font-bold border-r border-black overflow-hidden">
                Page URL
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Access status
              </div>
            </div>
            {user && user.facebookPages && user.facebookPages.length > 0 ? (
              user.facebookPages.map((page: IFacebookPage) => (
                <div
                  key={page.page_id}
                  className="mx-1 mb-20 flex  border-b border-gray-400 bg-white dark:bg-black"
                >
                  <div
                    onClick={() => deletePageAccess(page.page_id)}
                    className="w-10 flex justify-center items-center border-r border-gray-300 overflow-hidden cursor-pointer text-red-500"
                  >
                    <TrashIcon className="h-5 w-5 inline" aria-hidden="true" />
                  </div>
                  <div className="w-52 flex justify-center items-center border-r border-gray-300 overflow-hidden">
                    {page.page_name}
                  </div>
                  <div className="w-96 flex justify-center items-center border-r border-gray-300 overflow-hidden">
                    {page.page_url}
                  </div>
                  <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                    <span className="font-semibold">{page.access_status}</span>
                    {page.access_status === "access_granted" && (
                      <>
                        <button
                          onClick={() =>
                            router.push(`/meta-ads/pages/${page.page_id}`)
                          }
                          className="py-1 px-3 bg-green-500 text-white rounded-lg m-1"
                        >
                          manage
                        </button>
                      </>
                    )}
                    {page.access_status === "access_request_sent" && (
                      <>
                        <br />
                        <p className="text-xs">
                          An email of an access request was sent to your
                          page&apos;s email address. Please check your inbox.
                          <br />
                          After you have accepted the access request, please
                          click on &quot;validated access&quot;.
                        </p>
                        <div>
                          <button
                            onClick={() => deletePageAccess(page.page_id)}
                            className="py-1 px-3 bg-red-500 text-white rounded-lg m-1"
                          >
                            denied access
                          </button>
                          <button
                            onClick={() => validatePageAccess(page.page_id)}
                            className="py-1 px-3 bg-green-500 text-white rounded-lg m-1"
                          >
                            validated access
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="mb-20 text-center bg-white">
                No Facebook Pages added.
              </div>
            )}
          </div>
        ) : (
          <div className="mb-20 mx-4 md:mx-10 text-center text-2xl font-semibold">
            <h2>You have to be logged in to use this service.</h2>
            <div>
              <Link href="/login" passHref>
                <button className="bg-facebook text-white py-1 px-4 rounded-lg my-4">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
MetaAdsScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default MetaAdsScreen;
