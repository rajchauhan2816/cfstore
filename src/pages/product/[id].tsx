import { fetchSku } from "@/store/sku";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductDescription from "@component/products/ProductDescription";
import ProductIntro from "@component/products/ProductIntro";
import RelatedProducts from "@component/products/RelatedProducts";
import { H5 } from "@component/Typography";
import React, { useState, useEffect } from "react";

interface IQueryParams {
  id: string;
}

// type PartialProductVariant = DeepPartial<ProductVariant>
export interface ProductIntroProps {
  imgUrl?: string;
  title: string;
  price: number;
  quantityAvailable: number,
  id?: string;
}

const ProductDetails = ({ query: { id = "" } }: { query: IQueryParams }) => {

  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };
  console.log(id);
  const [isSku, setIsSku] = useState(false);
  const [sku, setSku] = useState({
    title: "",
    price: 0,
    imgUrl: "",
    quantityAvailable: 0,
    id,
    description: []
  });

  const [relativeSku, setRelativeSku] = useState([]);

  useEffect(() => {
    fetchSku({ variantId: id }).then((_sku) => {
      const { description } = _sku.product;
      const desc = JSON.parse(description);


      const sku = {
        description: desc.blocks.map(block => block.data.text),
        imgUrl: _sku.media[0] && _sku.media[0].url,
        title: _sku.name,
        price: _sku.pricing.price.net.amount,
        quantityAvailable: _sku.quantityAvailable,
        id: _sku.id
      }
      setSku(sku);
      setIsSku(true);

      // set relative sku
      const relativeSku = _sku.product.variants.filter(variant => variant.id !== _sku.id);
      console.log(relativeSku);
      setRelativeSku(relativeSku.map((relSku) => {
        return {
          id: relSku.id,
          imgUrl: relSku.media[0] && relSku.media[0].url,
          title: relSku.name,
          price: relSku.pricing?.price.net.amount,
          quantityAvailable: relSku.quantityAvailable
        }
      }));
    });
  }, [JSON.stringify(sku), id])

  return isSku ? (
    <div key={`${sku.id}-id`}>
      <ProductIntro {...sku} key={id} />

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          className="cursor-pointer"
          mr="25px"
          p="4px 10px"
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
          borderBottom={selectedOption === "description" && "2px solid"}
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
        >
          Description
        </H5>
        {/* <H5
          className="cursor-pointer"
          p="4px 10px"
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" && "2px solid"}
          borderColor="primary.main"
        >
          Review (3)
        </H5> */}
      </FlexBox>

      <Box mb="50px">
        <ProductDescription key={sku.id} description={sku.description} />
        {/* {selectedOption === "review" && <ProductReview />} */}
      </Box>

      {/* <FrequentlyBought /> */}

      {/* <AvailableShops /> */}

      {relativeSku.length > 0 ? <RelatedProducts relativeSku={relativeSku} /> : ""}
    </div>
  ) : "";
};

ProductDetails.getInitialProps = async ({ query, pathname }) => {

  return { query, pathname }
}

ProductDetails.layout = NavbarLayout;

export default ProductDetails;
