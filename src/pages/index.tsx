import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Box from "@component/Box";
import GrocerFooter from "@component/home-2/GroceryFooter";
import GrocerySection1 from "@component/home-2/GrocerySection1";
import GrocerySection2 from "@component/home-2/GrocerySection2";
// import GrocerySection3 from "@component/home-2/GrocerySection3";
import GrocerySection4 from "@component/home-2/GrocerySection4";
// import GrocerySection5 from "@component/home-2/GrocerySection5";
// import GrocerySection6 from "@component/home-2/GrocerySection6";
// import GrocerySection7 from "@component/home-2/GrocerySection7";
// import GrocerySection8 from "@component/home-2/GrocerySection8";
import GrocerySection9 from "@component/home-2/GrocerySection9";
import GrocerySidenav from "@component/home-2/GrocerySidenav";
import GroceryWrapper from "@component/home-2/GroceryWrapper";
import GroceryLayout from "@component/layout/GroceryLayout";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

// import { fetchProductVariants } from '@/store/product-variants'
import { fetchCategories } from '@/store/category';
import { fetchCollections } from "@/store/collection";

interface ISku {
  price: number;
  title: string;
  imgUrl: string;
  category: string;
  id: string;
}
interface listing {
  title: string;
  skus: ISku[]
}

const Home2 = () => {
  const [isSidenavFixed, setSidenavFixed] = useState(false);

  const scrollListener = useCallback(
    debounce(() => {
      setSidenavFixed(window.pageYOffset > 60);
    }, 0),
    []
  );

  const dispatch = useAppDispatch();

  const { pincode, deliveryDate } = useAppSelector(store => store.datePincode)

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("calling fetch collection");
    dispatch(fetchCollections());
  }, [pincode, deliveryDate])


  const { collections } = useAppSelector(store => store.collections);
  const RefinedCollections: listing[] = [];
  collections.forEach((collection) => {
    const listing = {
      title: "",
      skus: []
    };
    listing.title = collection.name
    collection.products.edges.forEach((product) => {
      const varinats = product.node?.variants;
      listing.skus.push(...varinats.map((variant) => {
        return {
          price: variant?.pricing?.price.net.amount,
          title: variant?.name,
          imgUrl: variant?.media[0] && variant?.media[0].url,
          category: collection?.name,
          id: variant?.id,
        }
      }))
    })
    RefinedCollections.push(listing);
  })

  return (
    <GroceryWrapper isSidenavFixed={isSidenavFixed}>
      <Box className="sidenav">
        <GrocerySidenav isFixed={isSidenavFixed} />
      </Box>
      <Box className="content">
        <Box className="section-1">
          <GrocerySection1 key="section-1" />
        </Box>
        <Box mb="3rem" overflow="hidden">
          <GrocerySection2 key="section-2" />
        </Box>
        {/* <Box mb="3rem">
          <GrocerySection3 />
        </Box> */}
        {RefinedCollections.map((collection, index) => {
          return <Box mb="3rem">
            <GrocerySection4 collection={collection} key={`section-${index}`} />
          </Box>
        })}
        {/* <Box mb="3rem">
          <GrocerySection4 key="section-4" />
        </Box> */}
        {/* <Box mb="3rem">
          <GrocerySection5 />
        </Box> */}
        {/* <Box mb="3rem">
          <GrocerySection6 />
        </Box> */}
        {/* <Box mb="3rem">
          <GrocerySection7 />
        </Box> */}
        {/* <Box mb="3rem">
          <GrocerySection8 />
        </Box> */}
        <Box mb="3rem">
          <GrocerySection9 key="section-9" />
        </Box>
        <GrocerFooter />
      </Box>
    </GroceryWrapper>
  );
};

Home2.layout = GroceryLayout;

export default Home2;
