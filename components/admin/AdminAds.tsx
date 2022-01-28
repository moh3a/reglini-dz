/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import { IFacebookPage } from "../../utils/types";

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
    <div className="my-2 p-2">
      <h1 className="text-4xl font-semibold mb-1">Meta Ads Dashboard</h1>
      <div className="my-2">
        <h1 className="text-xl font-bold mb-1">reglini-dz pages</h1>
        {pages && (
          <>
            <div className="mx-1 w-full flex border-b border-black bg-gray-200">
              <div className="w-10 text-center font-bold border-r border-black overflow-hidden">
                pp
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Username
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                User email
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
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Actions
              </div>
            </div>
            {pages?.map((page: any) => (
              <div
                key={page.page_id}
                className="mx-1 flex w-full border-b border-gray-400 bg-gray-100"
              >
                <div className="w-10 text-center border-r border-gray-300 overflow-hidden">
                  {page.user_picture && (
                    <img src={page.user_picture} alt={page.user_name} />
                  )}
                </div>
                <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                  {page.user_name}
                </div>
                <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                  {page.user_email}
                </div>
                <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                  {page.page_name}
                </div>
                <div className="w-96 text-center border-r border-gray-300 overflow-hidden">
                  <a href={page.page_url} target="_blank" rel="noreferrer">
                    {page.page_url}
                  </a>
                </div>
                <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                  {page.access_status}
                </div>
                <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                  {page.access_status === "processing_demand" && (
                    <button
                      onClick={() => accessRequestSent(page.page_id)}
                      className="border border-green-500 bg-green-400 text-white px-3 py-1 rounded-lg"
                    >
                      Send Access Request
                    </button>
                  )}
                  {page.access_status === "processing_validation" && (
                    <button
                      onClick={() => validatePageAccess(page.page_id)}
                      className="border border-indigo-500 bg-indigo-400 text-white px-3 py-1 rounded-lg"
                    >
                      Validate Access granted
                    </button>
                  )}
                  {/* annuler la demande d access */}
                  {page.access_status === "processing_deletion" && (
                    <button
                      onClick={() => deletePageAccess(page.page_id)}
                      className="border border-red-500 bg-red-400 text-white px-3 py-1 rounded-lg"
                    >
                      Delete Page Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="my-2">
        <h1 className="text-xl font-bold mb-1">reglini-dz ads</h1>
        {pages && (
          <>
            <div className="mx-1 w-full flex border-b border-black bg-gray-200">
              <div className="w-10 text-center font-bold border-r border-black overflow-hidden">
                pp
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Username
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Page name
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Ad status
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Post URL
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Ad created at
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Ad properties
              </div>
              <div className="w-52 text-center font-bold border-r border-black overflow-hidden">
                Actions
              </div>
            </div>
            {pages.map((page: any) => (
              <Fragment key={page.page_id}>
                {page.page_ads.map((ad: any) => (
                  <div
                    key={ad.created_at}
                    className="mx-1 flex w-full border-b border-gray-400 bg-gray-100"
                  >
                    <div className="w-10 text-center border-r border-gray-300 overflow-hidden">
                      {page.user_picture && (
                        <img src={page.user_picture} alt={page.user_name} />
                      )}
                    </div>
                    <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                      {page.user_name}
                    </div>
                    <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                      {page.page_name}
                    </div>
                    <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                      {ad.ad_status}
                    </div>
                    <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                      <a href={ad.post_url} target="_blank" rel="noreferrer">
                        {ad.post_url}
                      </a>
                    </div>
                    <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                      {ad.created_at}
                    </div>
                    <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
                      {ad.ad_audience} - {ad.ad_duration} days -{" "}
                      {ad.ad_total_budget} euros - {ad.ad_price} dzd
                    </div>
                    <div className="w-52 text-center border-r border-gray-300 overflow-hidden">
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
                            href={ad.payment.receipt}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={ad.payment.receipt} alt={page.page_id} />
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
                    </div>
                  </div>
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAds;
