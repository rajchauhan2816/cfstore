import React from "react";
import Box from "../Box";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";
import { H3 } from "../Typography";

interface sku {
  id?: string;
  imgUrl?: string;
  title: string;
  price: number;
  quantityAvailable: number,
}
export interface RelatedProductsProps {
  relativeSku:sku[]
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({relativeSku}) => {
  return (
    <Box mb="3.75rem">
      <H3 mb="1.5rem">Realted Products</H3>
      <Grid container spacing={8}>
        {relativeSku.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 {...item} hoverEffect />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
