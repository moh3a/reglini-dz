import { useEffect, useState } from "react";
import { IDSProductDetails } from "../../../utils/AETypes";

const ProductProperties = ({ product }: { product: IDSProductDetails }) => {
  return (
    <div>
      <h2>Product Properties</h2>
      <p>
        {
          product.aeop_ae_product_propertys.aeop_ae_product_property[0]
            .attr_name
        }
      </p>
    </div>
  );
};

export default ProductProperties;
