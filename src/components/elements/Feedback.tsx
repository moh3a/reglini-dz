import { useState } from "react";

const Feedback = ({ message, setMessage, setRate }: any) => {
  const [firstStar, setFirstStar] = useState(false);
  const [secondStar, setSecondStar] = useState(false);
  const [thirdStar, setThirdStar] = useState(false);
  const [fourthStar, setFourthStar] = useState(false);
  const [fifthStar, setFifthtStar] = useState(false);

  const selectFirst = () => {
    setRate(1);
    setFirstStar(true);
    setSecondStar(false);
    setThirdStar(false);
    setFourthStar(false);
    setFifthtStar(false);
  };
  const selectSecond = () => {
    setRate(2);
    setFirstStar(true);
    setSecondStar(true);
    setThirdStar(false);
    setFourthStar(false);
    setFifthtStar(false);
  };
  const selectThird = () => {
    setRate(3);
    setFirstStar(true);
    setSecondStar(true);
    setThirdStar(true);
    setFourthStar(false);
    setFifthtStar(false);
  };
  const selectFourth = () => {
    setRate(4);
    setFirstStar(true);
    setSecondStar(true);
    setThirdStar(true);
    setFourthStar(true);
    setFifthtStar(false);
  };
  const selectFifth = () => {
    setRate(5);
    setFirstStar(true);
    setSecondStar(true);
    setThirdStar(true);
    setFourthStar(true);
    setFifthtStar(true);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Feedback</h1>
      <p>Your feedback for our service would be appreciated !</p>
      <div className="flex justify-center items-center">
        <div className="flex items-center my-2">
          <svg
            onClick={() => {
              selectFirst();
            }}
            className={`mx-1 w-4 h-4 fill-current ${
              firstStar ? "text-yellow-400" : "text-gray-400"
            }  hover:text-yellow-400`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            onClick={() => {
              selectSecond();
            }}
            className={`mx-1 w-4 h-4 fill-current ${
              secondStar ? "text-yellow-400" : "text-gray-400"
            }  hover:text-yellow-400`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            onClick={() => {
              selectThird();
            }}
            className={`mx-1 w-4 h-4 fill-current ${
              thirdStar ? "text-yellow-400" : "text-gray-400"
            }  hover:text-yellow-400`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            onClick={() => {
              selectFourth();
            }}
            className={`mx-1 w-4 h-4 fill-current ${
              fourthStar ? "text-yellow-400" : "text-gray-400"
            }  hover:text-yellow-400`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            onClick={() => {
              selectFifth();
            }}
            className={`mx-1 w-4 h-4 fill-current ${
              fifthStar ? "text-yellow-400" : "text-gray-400"
            }  hover:text-yellow-400`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      </div>
      <div>
        <textarea
          className="w-full rounded-lg "
          rows={2}
          placeholder="Leave a feedback message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Feedback;
