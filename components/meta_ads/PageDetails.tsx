import React, { useState } from "react";
import { IFacebookPage } from "../../types";
import CreatedAds from "./CreatedAds";
import NewAd from "./NewAd";

function PageDetails({ page }: { page: IFacebookPage }) {
  const [createAd, setCreateAd] = useState(false);

  return (
    <div className="my-12 md:my-20 mx-4 md:mx-8">
      <h1 className="text-3xl font-semibold">
        {page.page_name}
        <span className="text-base ml-1">
          <i className="fab fa-facebook-square text-facebook p-1"></i>
          {page.instagram_page_linked && (
            <i className="fab fa-instagram text-pink-600 p-1"></i>
          )}
        </span>
      </h1>
      <h2 className="text-sm">{page.page_url}</h2>
      <h3 className="my-3 font-semibold">Page status: {page.access_status}</h3>
      <div>
        <div className="border-b border-indigo-500 flex justify-between pb-1">
          <div className="flex justify-start items-center">
            Ask to create an ad
          </div>
          <div>
            {createAd ? (
              <button
                onClick={() => setCreateAd(false)}
                className="px-3 py-1 text-indigo-500 font-bold rounded-lg"
              >
                close
              </button>
            ) : (
              <button
                onClick={() => setCreateAd(true)}
                className="px-3 py-1 bg-indigo-500 text-white font-bold rounded-lg"
              >
                create ad
              </button>
            )}
          </div>
        </div>
        {createAd && <NewAd page={page} setCreateAd={setCreateAd} />}
      </div>
      <CreatedAds page={page} />
    </div>
  );
}

export default PageDetails;
