/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import { IFacebookPage } from "../../types";

interface IPage extends IFacebookPage {
  user_picture: string;
  user_email: string;
  user_name: string;
}

const AdminAds = () => {
  const [pages, setPages] = useState<any[]>();

  const fetchFbPages = useCallback(async () => {
    const { data } = await axios.post("/api/admin/ads");
    let p: any[] = [];
    if (data.success) {
      data.data.map((user: any) => {
        user.facebookPages.map((page: IFacebookPage) => {
          p.push({
            user_picture: user.picture,
            user_email: user.email,
            user_name: user.name,
            ...page,
          });
        });
      });
      setPages(p);
    }
  }, []);

  useEffect(() => {
    fetchFbPages();
  }, [fetchFbPages]);

  const deletePageAccess = async (id: string) => {
    await axios.post("/api/admin/ads/pages/deleteAccess", {
      id,
    });
  };

  const accessRequestSent = async (id: string) => {
    await axios.post("/api/admin/ads/pages/accessRequestSent", {
      id,
    });
  };

  const validatePageAccess = async (id: string) => {
    await axios.post("/api/admin/ads/pages/validateAccess", {
      id,
    });
  };

  const acceptNewAd = async (id: string, created_at: string) => {
    await axios.post("/api/admin/ads/ad/acceptNewAd", {
      pageId: id,
      adCreatedAt: created_at,
    });
  };

  const acceptPayment = async (id: string, created_at: string) => {
    await axios.post("/api/admin/ads/ad/payment", {
      pageId: id,
      adCreatedAt: created_at,
      isAccepted: true,
    });
  };

  const declinePayment = async (id: string, created_at: string) => {
    await axios.post("/api/admin/ads/ad/payment", {
      pageId: id,
      adCreatedAt: created_at,
      isAccepted: false,
    });
  };

  return (
    <div className="my-2">
      <h1 className="text-2xl font-semibold mb-1">Meta Ads Dashboard</h1>
      <div className="my-6">
        <h2 className="text-xl font-bold mb-1">reglini-dz pages</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-grim dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Page
                </th>
                <th scope="col" className="px-6 py-3">
                  Access status
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pages?.map((page: IPage) => (
                <tr
                  key={page.page_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <div className="flex">
                      <div>
                        {page.user_picture && (
                          <img
                            src={page.user_picture}
                            alt={page.user_name}
                            className="w-10 mr-2 rounded-full"
                          />
                        )}
                      </div>
                      <div>
                        <p>{page.user_name}</p>
                        <p>{page.user_email}</p>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <p>{page.page_name}</p>
                    <a href={page.page_url} target="_blank" rel="noreferrer">
                      {page.page_url}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 border text-white rounded-full ${
                        page.access_status === "processing_demand" &&
                        "border-yellow-400 bg-yellow-300 dark:bg-yellow-600"
                      } ${
                        page.access_status === "processing_validation" &&
                        "border-indigo-400 bg-indigo-300 dark:bg-indigo-600"
                      } ${
                        page.access_status === "processing_deletion" &&
                        "border-red-400 bg-red-300 dark:bg-red-600"
                      } ${
                        page.access_status === "access_granted" &&
                        "border-green-400 bg-green-300 dark:bg-green-600"
                      }`}
                    >
                      {page.access_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {page.access_status === "processing_demand" && (
                      <button
                        onClick={() => accessRequestSent(page.page_id)}
                        className="font-medium text-green-600 dark:text-green-500 hover:underline"
                      >
                        Send Access Request
                      </button>
                    )}
                    {page.access_status === "processing_validation" && (
                      <button
                        onClick={() => validatePageAccess(page.page_id)}
                        className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                      >
                        Validate Access granted
                      </button>
                    )}
                    {page.access_status === "access_granted" && (
                      <button
                        onClick={() => console.log(page.page_id)}
                        className="font-medium hover:underline"
                      >
                        View Details &gt;
                      </button>
                    )}
                    {page.access_status === "processing_deletion" && (
                      <button
                        onClick={() => deletePageAccess(page.page_id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete Page Access
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-6">
        <h1 className="text-xl font-bold mb-1">reglini-dz ads</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-grim dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User / Page
                </th>
                <th scope="col" className="px-6 py-3">
                  Ad status
                </th>
                <th scope="col" className="px-6 py-3">
                  Post URL
                </th>
                <th scope="col" className="px-6 py-3">
                  Ad properties
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pages?.map((page: IPage) => (
                <Fragment key={page.page_id}>
                  {page.page_ads.map((ad, i) => (
                    <tr key={i} className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        <div className="flex">
                          <div>
                            {page.user_picture && (
                              <img
                                src={page.user_picture}
                                alt={page.user_name}
                                className="w-10 mr-2 rounded-full"
                              />
                            )}
                          </div>
                          <div>
                            <p>{page.user_name}</p>
                            <p>{page.page_name}</p>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{ad.ad_status}</td>
                      <td className="px-6 py-4">{ad.post_url}</td>
                      <td className="px-6 py-4">
                        <p>
                          <span className="text-gray-600 dark:text-gray-300">
                            Created at
                          </span>{" "}
                          {ad.created_at}
                        </p>
                        <p>
                          <span className="text-gray-600 dark:text-gray-300">
                            Audience
                          </span>{" "}
                          {ad.ad_audience}
                        </p>
                        <p>
                          <span className="text-gray-600 dark:text-gray-300">
                            Duration
                          </span>{" "}
                          {ad.ad_duration} days
                        </p>
                        <p>
                          <span className="text-gray-600 dark:text-gray-300">
                            Total budget
                          </span>{" "}
                          {ad.ad_total_budget} euros
                        </p>
                        <p>
                          <span className="text-gray-600 dark:text-gray-300">
                            Ad Price
                          </span>{" "}
                          {ad.ad_price} DZD
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {ad.ad_status === "request_new_ad" && (
                          <button
                            onClick={() =>
                              acceptNewAd(page.page_id, ad.created_at)
                            }
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                          >
                            Accept new ad
                          </button>
                        )}
                        {ad.ad_status === "processing_payment" && (
                          <>
                            <a
                              href={ad.payment?.receipt}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={ad.payment?.receipt}
                                alt={page.page_id}
                              />
                            </a>
                            <button
                              onClick={() =>
                                acceptPayment(page.page_id, ad.created_at)
                              }
                              className="px-3 py-1 bg-green-500 text-white rounded-lg"
                            >
                              Accept payment and start ad
                            </button>
                            <button
                              onClick={() =>
                                declinePayment(page.page_id, ad.created_at)
                              }
                              className="px-3 py-1 bg-red-500 text-white rounded-lg"
                            >
                              Decline payment
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAds;
