import React, { useEffect, useState } from "react";
import { Tr, Td, Image, Badge } from "@chakra-ui/react";

export const SingleProd = ({ product, gramentStatus }) => {
  const [garmentInfo, setGarmentInfo] = useState({});
  console.log(gramentStatus);
  const host = "https://api.outfitxr.io";
  const fetchProductInfo = async (productId) => {
    const url = host + `/products?external_product_id=${productId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        Cookie: cookie,
      },
    });
    const result = await response?.json();
    setGarmentInfo(result?.products_by_external_id[0]?.virtual_garment_status);
  };

  useEffect(() => {
    fetchProductInfo(product?.id);
  }, []);

  return (
    <Tr key={product?.id}>
      <Td>
        {product?.featuredImage ? (
          <Image
            src={product?.featuredImage?.url}
            alt={product?.title}
            boxSize="50px"
          />
        ) : (
          "No Image"
        )}
      </Td>
      <Td>{product?.title}</Td>
      <Td>
        <Badge variant="solid" colorScheme="green">
          Active
        </Badge>
      </Td>
      <Td>{gramentStatus?.virtual_garment_status?.name}</Td>
    </Tr>
  );
};
