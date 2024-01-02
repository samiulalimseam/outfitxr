import { Box, Button, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SingleProd } from "./SingleProd";
import { bearer, cookie } from "../headers";

const ProductTable = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [garmentInfo, setGarmentInfo] = useState([]);
  const productsPerPage = 5; // Number of products to display per page

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const host = "https://api.outfitxr.io";

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const productIds = (productsArray) => {
    let productIdStrring = "";
    productsArray?.map((product) => {
      productIdStrring += `external_product_id=${product?.id
        ?.split("/")
        .pop()}&`;
    });
    return productIdStrring;
  };

  const fetchProductInfo = async (params) => {
    const url = host + `/products?${params}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        Cookie: cookie,
      },
    });
    const result = await response?.json();
    setGarmentInfo(result?.products_by_external_id);
  };
  useEffect(() => {
    const idsstring = productIds(products);
    fetchProductInfo(idsstring);
  }, []);
  console.log("sasasa-", garmentInfo);

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th> </Th>
            <Th>Status</Th>
            <Th>Virtual Garment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentProducts?.map((product) => {
            // single prod
            const gramentStatus = garmentInfo?.find((garment) => {
                console.log(`${garment?.external_product_id.toString()} ===
                ${product?.id?.split("/").pop().toString()}`)
              return (
                garment?.external_product_id.toString() ===
                product?.id?.split("/").pop().toString()
              );
            });
            console.log('garm obj', gramentStatus)
            return (
              <SingleProd gramentStatus={gramentStatus} product={product} />
            );
          })}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        {Array.from({
          length: Math?.ceil(products?.length / productsPerPage),
        }).map((_, index) => (
          <Button
            border={"1px solid"}
            key={index}
            onClick={() => paginate(index + 1)}
            variant="outline"
            mx={1}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ProductTable;
