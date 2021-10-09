import { useAppSelector } from "@/app/hooks";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import GroceryHeader from "@component/header/GroceryHeader";
import MobileCategoryImageBox from "@component/mobile-category-nav/MobileCategoryImageBox";
import { MobileCategoryNavStyle } from "@component/mobile-category-nav/MobileCategoryNavStyle";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Typography from "@component/Typography";
import Link from "next/link";
import React from "react";

const MobileCategoryNav = () => {

  const { categories, error: _error, loading: _loading } = useAppSelector(store => store.category);
  const AllCategories = categories.map((x) => {
    const category = {
      title: x.name,
      icon: x.slug, // fish
      href: `/product/sku/?category=${x.id}&name=${x.slug}`,
      url: `/assets/images/products/categories/category_${x.slug}`
    }
    return category;
  })


  return (
    <MobileCategoryNavStyle>
      <GroceryHeader className="header" />
      {/* <div className="main-category-holder">
        {navigations.map((item) => (
          <Box
            className="main-category-box"
            borderLeft={`${category?.href === item.href ? "3" : "0"}px solid`}
            onClick={handleCategoryClick(item)}
            key={item.title}
          >
            <Icon size="28px" mb="0.5rem">
              {item.icon}
            </Icon>
            <Typography
              className="ellipsis"
              textAlign="center"
              fontSize="11px"
              lineHeight="1"
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </div> */}
      <Box className="container">
        <Typography fontWeight="600" fontSize="15px" mb="1rem">
          Categories
        </Typography>
        <Box mb="2rem">
          <Grid container spacing={3}>
            {AllCategories.map((item, ind) => (
              <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                <Link href={item.href}>
                  <a>
                    <MobileCategoryImageBox {...item} />
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
};

export default MobileCategoryNav;
