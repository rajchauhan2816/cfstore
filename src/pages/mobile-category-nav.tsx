import { useAppSelector } from "@/app/hooks";
import Accordion from "@component/accordion/Accordion";
import AccordionHeader from "@component/accordion/AccordionHeader";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import GroceryHeader from "@component/header/GroceryHeader";
import Icon from "@component/icon/Icon";
import MobileCategoryImageBox from "@component/mobile-category-nav/MobileCategoryImageBox";
import { MobileCategoryNavStyle } from "@component/mobile-category-nav/MobileCategoryNavStyle";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Typography from "@component/Typography";
import navigations from "@data/navigations";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

const MobileCategoryNav = () => {
  const [category, setCategory] = useState(null);
  const [suggestedList, setSuggestedList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const { categories, error:_error ,loading:_loading } = useAppSelector(store => store.category);
  const AllCategories = categories.map((x) => {
    const category = {
      title: x.name,
      icon: x.slug, // fish
      href: `/product/sku/?category=${x.id}&name=${x.slug}`,
      url: `/assets/images/products/categories/category_${x.slug}`
    }
    return category;
  })

  const handleCategoryClick = (cat) => () => {
    let menuData = cat.menuData;
    if (menuData) {
      setSubCategoryList(menuData.categories || menuData);
    } else setSubCategoryList([]);
    setCategory(cat);
  };

  useEffect(() => {
    setSuggestedList(suggestion);
  }, []);

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

const suggestion = [
  {
    title: "Belt",
    href: "/belt",
    imgUrl: "/assets/images/products/categories/belt.png",
  },
  {
    title: "Hat",
    href: "/Hat",
    imgUrl: "/assets/images/products/categories/hat.png",
  },
  {
    title: "Watches",
    href: "/Watches",
    imgUrl: "/assets/images/products/categories/watch.png",
  },
  {
    title: "Sunglasses",
    href: "/Sunglasses",
    imgUrl: "/assets/images/products/categories/sunglass.png",
  },
  {
    title: "Sneakers",
    href: "/Sneakers",
    imgUrl: "/assets/images/products/categories/sneaker.png",
  },
  {
    title: "Sandals",
    href: "/Sandals",
    imgUrl: "/assets/images/products/categories/sandal.png",
  },
  {
    title: "Formal",
    href: "/Formal",
    imgUrl: "/assets/images/products/categories/shirt.png",
  },
  {
    title: "Casual",
    href: "/Casual",
    imgUrl: "/assets/images/products/categories/t-shirt.png",
  },
];

export default MobileCategoryNav;
