import { theme } from "@/utils/theme";
import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
// import productDatabase from "@data/product-database";
import useWindowSize from "@hook/useWindowSize";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link/NavLink";
import ProductCard1 from "../product-cards/ProductCard1";
import { H3 } from "../Typography";

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
interface GrocerySection4Props {
  collection: listing;
}

const GrocerySection4: React.FC<GrocerySection4Props> = ({ collection }) => {
  const [visibleSlides, setVisibleSlides] = useState(3);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    //   else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <Box>
      <FlexBox justifyContent="space-between" justifyItems="center">
        <H3 fontSize="25px" mb="2rem">
          {/* // TODO : collection from pre component, use map. */}
          {collection.title}
        </H3>
        {/* // TODO : set accordingly collection explore all */}
        <FlexBox alignItems="center">
          <NavLink
            style={{ "color": `${theme.colors.primary.main}`, "fontWeight": "bolder", "fontSize": "1.15rem" }}
            className="nav-link"
            href={'/product/sku/?category=&name=All Category'}
            key={'Explore All'}
            rel="noopener noreferrer"
          >
            {'Explore All'}
          </NavLink>
        </FlexBox>
      </FlexBox>

      <Box my="-0.25rem">
        <Carousel
          totalSlides={collection.skus.length}
          visibleSlides={visibleSlides}
          step={3}
          showDots
          arrowButtonColor="inherit"
          showArrowOnHover={true}
        >
          {collection.skus.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              <ProductCard1 {...item} off={25} key={ind} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default GrocerySection4;
