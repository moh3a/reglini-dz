import { IDSapiProductDetails } from "../../../utils/AETypes";

const ProductProperties = ({
  product,
}: {
  product: IDSapiProductDetails["result"];
}) => {
  return (
    <div>
      <h2>Product Properties</h2>
    </div>
  );
};

export default ProductProperties;
