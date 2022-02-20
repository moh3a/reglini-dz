/* eslint-disable @next/next/no-img-element */
export const CurrencyView = ({
  title,
  subtitle,
  list,
}: {
  title: string;
  subtitle: string;
  list: any[];
}) => {
  return (
    <div className="min-w-max w-full bg-white dark:bg-grim flex flex-col justify-center items-center my-16">
      <h1 className="text-xl lg:text-4xl font-bold">{title}</h1>
      <h2 className="text-xs lg:text-sm">{subtitle}</h2>
      <div className="my-4 grid grid-cols-3 gap-x-3 md:gap-x-6 select-none">
        {list.map((item: any) => (
          <CurrencyCardInfo key={item.exchange} item={item} />
        ))}
      </div>
    </div>
  );
};

export const CurrencyCardInfo = ({ item }: any) => {
  return (
    <div className="p-2 container aspect-square bg-gray-100 dark:bg-black rounded-lg shadow-lg overflow-hidden">
      <div className="flex">
        {item.exchange === "DZDEUR" && <FlagEU />}
        {item.exchange === "DZDUSD" && <FlagUS />}
        {item.exchange === "DZDGBP" && <FlagUK />}
        <p className="ml-1">1 {item.symbol} =</p>
      </div>
      <p className="text-xs">updated today</p>
      <div className="my-5 text-lg font-semibold">{item.current} dzd</div>
      <p className="text-xs">
        {item.rate === 1 && "same as yesterday"}
        {item.rate > 1 && "more than yesterday"}
        {item.rate < 1 && "less than yesterday"}
      </p>
    </div>
  );
};

const FlagEU = () => {
  return (
    <div className="w-6 h-6 inline rounded-full mr-1">
      <img className="h-6 w-6" src="/flag-eu.png" alt="EU flag" />
    </div>
  );
};

const FlagUK = () => {
  return (
    <div className="w-6 h-6 inline">
      <a
        className="sr-only"
        href="https://icons8.com/icon/t3NE3BsOAQwq/great-britain"
      >
        Great Britain icon by Icons8
      </a>
      <img
        src="https://img.icons8.com/color/48/000000/great-britain-circular.png"
        alt="UK flag"
      />
    </div>
  );
};

const FlagUS = () => {
  return (
    <div className="w-6 h-6 inline">
      <a className="sr-only" href="https://icons8.com/icon/aRiu1GGi6Aoe/usa">
        Usa icon by Icons8
      </a>
      <img
        src="https://img.icons8.com/color/48/000000/usa-circular.png"
        alt="USA flag"
      />
    </div>
  );
};
