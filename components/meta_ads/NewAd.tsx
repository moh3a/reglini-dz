import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { emplacement_instagram, facebook_reach } from "../../data/AdReach";
import { LocalISODate } from "../../utils/methods";
import { IFacebookPage } from "../../types";
import { createAdRequest } from "../../utils/redux/userAsyncActions";
import { DangerDialog } from "../../components/elements/Dialog";

function NewAd({
  page,
  converter,
  rate,
  commission,
  setCreateAd,
}: {
  page: IFacebookPage;
  commission: number | undefined;
  rate: number | undefined;
  converter: (price: number) => number | undefined;
  setCreateAd: any;
}) {
  const [error, setError] = useState("");
  const [emplacement, setEmplacement] = useState("facebook");
  const [postUrl, setPostUrl] = useState("");
  const [audience, setAudience] = useState("Algérie");
  const [duration, setDuration] = useState(2);
  const [budget, setBudget] = useState(3);
  const dispatch = useDispatch();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (page && emplacement && postUrl && audience && duration && budget) {
      dispatch(
        createAdRequest({
          pageId: page?.page_id,
          pageAd: {
            ad_status: "request_new_ad",
            created_at: LocalISODate(),
            ad_emplacement: emplacement,
            post_url: postUrl,
            ad_audience: audience,
            ad_duration: duration,
            ad_daily_bugdet: budget,
            ad_total_budget: budget * duration,
            ad_price: (converter(budget) as number) * duration,
          },
        })
      );
      setCreateAd(false);
    } else {
      setError("Something went wrong!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="my-4 border-b border-indigo-500 pb-1"
    >
      {error && <DangerDialog>{error}</DangerDialog>}

      {page.instagram_page_linked && (
        <>
          <label className="font-bold">Where would you create your ad?</label>
          <div onChange={(e: any) => setEmplacement(e.target.value)}>
            <input
              className="h-6 w-6 mb-1"
              type="radio"
              name="emplacement"
              value="facebook"
            />{" "}
            Facebook
            <br />
            <input
              className="h-6 w-6"
              type="radio"
              name="emplacement"
              value="instagram"
            />{" "}
            Instagram
          </div>
          <br />
        </>
      )}
      <div className="font-bold">
        <span className="text-red-500">*</span>
        Copy and paste the URL of the post you want to promote
      </div>
      <input
        className="rounded-lg w-full max-w-lg my-1"
        type="text"
        placeholder={
          emplacement === "facebook"
            ? "https://facebook.com/xxx/posts/xxx"
            : "https://instagram.com/tv/xxxxxxx"
        }
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
      />
      <br />
      <div className="my-2">
        <label className="font-bold">Select your audience</label>
        <br />
        <p className="text-sm">
          If you want your ad to have a national reach, leave it at
          &quot;Algérie&quot;, or select specific regions for your ad
          &quot;Alger, Blida, Tipaza&quot;.
        </p>
        <input
          className="rounded-lg w-full max-w-lg my-1"
          type="text"
          placeholder="Algérie - or Setif, Constantine, Bejaia"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
      </div>
      <div className="my-2">
        <label className="font-bold">Select the duration</label>
        <br />
        <input
          className="w-full max-w-md"
          type="range"
          min={2}
          max={10}
          step={1}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
        <span className="relative bottom-1 ml-2 text-gray-500">
          duration: {duration} days
        </span>
      </div>
      <div className="my-2">
        <label className="font-bold">Select your daily budget</label>
        <br />
        <input
          className="w-full max-w-md"
          type="range"
          min={3}
          max={15}
          step={1}
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
        />
        <span className="relative bottom-1 ml-2 text-gray-500">
          daily budget:{" "}
          {rate && commission ? (
            <span>{converter(budget)} DZD</span>
          ) : (
            <span>{budget} euros</span>
          )}
        </span>
      </div>
      <div className="my-2 font-bold text-gray-600 dark:text-gray-400">
        {emplacement === "facebook" && (
          <div>
            Potential reach: {facebook_reach.min * budget} -{" "}
            {facebook_reach.max * budget} people reached per day x{duration}{" "}
            days.
          </div>
        )}
        {emplacement === "instagram" && (
          <>
            <div>
              Potential reach: {emplacement_instagram.reach.min * budget} -{" "}
              {emplacement_instagram.reach.max * budget} people reached per day
              x{duration} days.
            </div>
            <div>
              Interactions with post: {emplacement_instagram.clics.min * budget}{" "}
              - {emplacement_instagram.clics.max * budget} clics.
            </div>
          </>
        )}
        <div>
          Total budget:
          {rate && commission ? (
            <span>{(converter(budget) as number) * duration} DZD</span>
          ) : (
            <span>{duration * budget} euros</span>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="px-3 py-1 bg-green-500 text-white rounded-lg"
        >
          Create an Ad request
        </button>
      </div>
    </form>
  );
}

export default NewAd;
