import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addItemToCart, updateTokenCart } from "@/store/cart";
import LazyImage from "@component/LazyImage";
// import { useAppContext } from "@context/app/AppContext";
// import { CartItem } from "@reducer/cartReducer";
// import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
// import Rating from "../rating/Rating";
import { H1, H2, H3, SemiSpan } from "../Typography";

export interface ProductIntroProps {
  imgUrl?: string;
  title: string;
  price: number;
  quantityAvailable: number,
  id?: string;
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  title,
  price = 200,
  id,
}) => {
  // const router = useRouter();
  // const routerId = router.query.id as string;
  const { items } = useAppSelector(store => store.cart);
  const cartItem = items.find((item) => item.id === id);
  const { isLoggedIn } = useAppSelector(store => store.auth);


  const dispatch = useAppDispatch();
  const handleCartAmountChange = useCallback(
    (amount) => () => {
      const payload = { id, name: title, imgUrl, price, qty: amount }
      if (amount >= 0) {
        if (isLoggedIn) {
          dispatch(updateTokenCart([payload]));
        }
        else {
          dispatch(addItemToCart(payload))
        }

      }
    },
    []
  );

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              <LazyImage
                src={imgUrl}
                alt={title}
                height="300px"
                width="auto"
                loading="eager"
                objectFit="contain"
              />
            </FlexBox>
            {/* <FlexBox overflow="auto">
              <Box
                size={70}
                minWidth={70}
                bg="white"
                borderRadius="10px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                border="1px solid"
                borderColor={"primary.main"}
              >
                <Avatar src={imgUrl} borderRadius="10px" size={40} />
              </Box>
              ))
            </FlexBox> */}
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Brand:</SemiSpan>
            <H6 ml="8px">Ziaomi</H6>
          </FlexBox> */}

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Rated:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox> */}

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              ₹{price.toFixed(2)}
            </H2>
            <SemiSpan color="inherit">Stock Available</SemiSpan>
          </Box>

          {!cartItem?.qty ? (
            <Button
              variant="contained"
              size="small"
              color="primary"
              mb="36px"
              onClick={handleCartAmountChange(1)}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Icon variant="small">minus</Icon>
              </Button>
              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>
              <Button
                p="9px"
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Sold By:</SemiSpan>
            <Link href="/shop/fdfdsa">
              <a>
                <H6 lineHeight="1" ml="8px">
                  Mobile Store
                </H6>
              </a>
            </Link>
          </FlexBox> */}
        </Grid>
      </Grid>
    </Box>
  );
};

ProductIntro.defaultProps = {
  imgUrl: "/assets/images/products/headphone.png",
  title: "Mi Note 11 Pro",
  price: 1100,
};

export default ProductIntro;
