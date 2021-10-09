import { useAppDispatch, useAppSelector } from "@/app/hooks";
import GrocerySidenav from "@/components/home-2/GrocerySidenav";
import { fetchProductVariants, searchProductVariants } from "@/store/product-variants";
import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import React, { useEffect } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

interface IQueryParams {
  category: string
  subCategory: string
  name: string;
  search: string;
}

const ProductSearchResult = ({ query: { category = "", subCategory: _ = "", name, search } }: { query: IQueryParams }) => {
  const width = useWindowSize();
  const isTablet = width < 1025;

  //1. Dispatch action to Fetch Categories. 
  const dispatch = useAppDispatch();
  const { pincode, deliveryDate } = useAppSelector(store => store.datePincode);
  useEffect(() => {
    if (search) {
      dispatch(searchProductVariants({ search }));
    } else {
      dispatch(fetchProductVariants({ categories: category ? [category] : [] }));
    }
  }, [category, pincode, deliveryDate,search])

  //2. Fetch All Category Variants From Store
  const { variants } = useAppSelector(store => store.productVariants);

  // 3. simplified varaints data for SKU Showcase
  let sku = variants.map(variant => {
    return {
      price: variant.pricing.price.net.amount,
      title: variant.name,
      imgUrl: variant.media[0] && variant.media[0].url,
      category: category,
      id: variant.id,
    }
  })

  return (
    <Box pt="20px">
      <FlexBox
        p="1.25rem"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mb="55px"
        elevation={5}
        as={Card}
      >
        <div>
          <H5>Searching for "{search ? search: name}"</H5>
          <Paragraph color="text.muted">{variants.length} results found</Paragraph>
        </div>
        <FlexBox alignItems="center" flexWrap="wrap">
          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton size="small">
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={600}>
          <GrocerySidenav isFixed={false} />
        </Hidden>

        <Grid item lg={9} xs={12}>
          <ProductCard1List sku={sku} key={search? search:category}/>
        </Grid>
      </Grid>
    </Box>
  );
};

// const sortOptions = [
//   { label: "Relevance", value: "Relevance" },
//   { label: "Date", value: "Date" },
//   { label: "Price Low to High", value: "Price Low to High" },
//   { label: "Price High to Low", value: "Price High to Low" },
// ];

ProductSearchResult.getInitialProps = async ({ query, pathname }) => {

  return { query, pathname }
}

ProductSearchResult.layout = NavbarLayout;

export default ProductSearchResult;
