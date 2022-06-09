import React, { useState } from "react";
import { emplacement_instagram, facebook_reach } from "../../data/AdReach";
import { LocalCurrencyConverter } from "../../utils/methods";

function SimulateAdResults() {
  const [emplacement, setEmplacement] = useState("facebook");
  const [duration, setDuration] = useState(2);
  const [budget, setBudget] = useState(3);

  return (
    <div className="my-4 mx-3">
      <label className="font-bold">Select your ad emplacement</label>
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

      <div className="my-2">
        <label className="font-bold">Select your audience</label>
        <br />
        <p className="text-sm">
          If you want your ad to have a national reach, leave it at
          &quot;Algérie&quot;, or select specific regions for your ad
          &quot;Alger, Blida, Tipaza&quot;.
        </p>
        <input
          disabled
          className="rounded-lg w-full max-w-lg my-1"
          type="text"
          placeholder="Algérie - or Setif, Constantine, Bejaia..."
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
          daily budget: (
          <span>{LocalCurrencyConverter(budget, "DZDEUR")} DZD</span>)
        </span>
      </div>
      <div className="my-2 font-bold text-gray-600 dark:text-gray-400">
        {emplacement === "facebook" && (
          <div>
            <i className="fab fa-facebook-square text-facebook p-1"></i>
            Potential reach: {facebook_reach.min * budget} -{" "}
            {facebook_reach.max * budget} people reached per day, x{duration}{" "}
            days.
          </div>
        )}
        {emplacement === "instagram" && (
          <>
            <div>
              <i className="fab fa-instagram text-pink-600 p-1"></i>
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
          <span>
            {(LocalCurrencyConverter(budget, "DZDEUR") as number) * duration}{" "}
            DZD
          </span>
        </div>
      </div>
    </div>
  );
}

export default SimulateAdResults;
