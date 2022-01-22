import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import ProductsList from "./ProductsList";

const HotProducts = () => {
  const [products, setProducts] = useState<any>();
  const [commission, setCommission] = useState<number>();
  const [rate, setRate] = useState<number>();

  const fetchRecommended = useCallback(async () => {
    const { data } = await axios.post(
      "/api/aliexpress/affiliate/hotproduct/query"
    );
    setProducts(data.data.products.product);
    setCommission(data.commission);
    setRate(data.rate);
    console.log(data);
  }, []);

  useEffect(() => {
    fetchRecommended();
  }, [fetchRecommended]);

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  return (
    <div>
      {products && (
        <>
          <h2 className="mt-6 text-2xl w-full text-center">
            Recommended by AliExpress
          </h2>
          <ProductsList products={products} converter={converter} />
        </>
      )}
    </div>
  );
};

export default HotProducts;
