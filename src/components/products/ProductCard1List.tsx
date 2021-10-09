import React from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
// import Pagination from "../pagination/Pagination";
import ProductCard1 from "../product-cards/ProductCard1";
// import { SemiSpan } from "../Typography";

interface ISku {
  price: number;
  title: string;
  imgUrl: string;
  category: string;
  id: string;
}
export interface ProductCard1ListProps {
  sku: ISku[]
}

const ProductCard1List: React.FC<ProductCard1ListProps> = ({ sku }) => {

  return (
    <div>
      <Grid container spacing={6}>
        {sku.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <ProductCard1 {...item} key={item.id} />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        {/* <SemiSpan>Showing 1-9 of 1.3k Products</SemiSpan>
        <Pagination pageCount={10} /> */}
      </FlexBox>
    </div>
  );
};

export default ProductCard1List;
