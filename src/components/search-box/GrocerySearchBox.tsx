import Button from "@component/buttons/Button";
import Card from "@component/Card";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import { debounce } from "lodash";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Box from "../Box";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import SearchBoxStyle from "./SearchBoxStyle";
import { useRouter } from "next/router";
import { realTimeSearchVariants } from "@/store/product-variants";
export interface GrocerySearchBoxProps { }

const GrocerySearchBox: React.FC<GrocerySearchBoxProps> = () => {
  const [resultList, setResultList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const search = debounce(async (e) => {
    const value = e.target?.value;
    // make search call on value
    //dispatch(searchProductVariants({ search }));
    const variants = await realTimeSearchVariants({ search: value });
    if (!value) setResultList([]);
    else setResultList(variants);
  }, 200);

  const hanldeSearch = useCallback((event) => {
    event.persist();
    setSearchText(event.target.value);
    search(event);
  }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const { push } = useRouter();
  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle >
        <Icon className="search-icon" size="18px">
          search
        </Icon>
        <TextField
          className="search-field"
          placeholder="Search and hit enter..."
          fullwidth
          onChange={hanldeSearch}
        />
        <Button className="search-button" variant="contained" color="primary" onClick={() => { push(`/product/sku?search=${searchText}`) }}>
          Search
        </Button>
        <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box>
      </SearchBoxStyle>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
          key={searchText}
        >
          {resultList.map((item) => (
            <Link href={`/product/${item.id}`} key={item}>
              <MenuItem key={item.id}>
                <Span fontSize="14px">{item.name}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

// const dummySearchResult = [
//   "Macbook Air 13",
//   "Ksus K555LA",
//   "Acer Aspire X453",
//   "iPad Mini 3",
// ];

export default GrocerySearchBox;
