import { IBasicProductDetails } from "../../../utils/AETypes";

const ProductProperties = ({
  product,
}: {
  product: IBasicProductDetails["result"];
}) => {
  return (
    <div>
      <h2>Product Properties</h2>
    </div>
  );
};

export default ProductProperties;
