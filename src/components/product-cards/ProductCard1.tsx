import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addItemToCart, updateTokenCart } from '@/store/cart';
import LazyImage from '@component/LazyImage';
import Link from 'next/link';
import React, { Fragment, useCallback } from 'react';
import { CSSProperties } from 'styled-components';
import Box from '../Box';
import Button from '../buttons/Button';
import { CardProps } from '../Card';
import FlexBox from '../FlexBox';
import Icon from '../icon/Icon';
import { H3, SemiSpan } from '../Typography';
import { StyledProductCard1 } from './ProductCardStyle';

export interface ProductCard1Props extends CardProps {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  off?: number;
  rating?: number;
  id?: string;
  // className?: string;
  // style?: CSSProperties;
  // imgUrl: string;
  // title: string;
  // price: number;
  // off: number;
  // rating?: number;
  // subcategories?: Array<{
  //   title: string;
  //   url: string;
  // }>;
}

const ProductCard1: React.FC<ProductCard1Props> = ({
  id,
  imgUrl,
  title,
  price,
  off,
  rating,
  ...props
}) => {
  // const [open, setOpen] = useState(false);

  // Fetch Item from Cart-State
  const { items } = useAppSelector(store => store.cart);
  const { isLoggedIn } = useAppSelector(store => store.auth);
  const cartItem = items.find((item) => item.id === id);
  // const toggleDialog = useCallback(() => {
  //   setOpen((open) => !open);
  // }, []);
  const dispatch = useAppDispatch()
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
    <StyledProductCard1 {...props}>
      <div className="image-holder">
        {/* {!!off && (
          <Chip
            position="absolute"
            bg="primary.main"
            color="primary.text"
            fontSize="10px"
            fontWeight="600"
            p="5px 10px"
            top="10px"
            left="10px"
          >
            {off}% off
          </Chip>
        )} */}

        {/* <FlexBox className="extra-icons">
          <Icon
            color="secondary"
            variant="small"
            mb="0.5rem"
            onClick={toggleDialog}
          >
            eye-alt
          </Icon>

          <Icon className="favorite-icon outlined-icon" variant="small">
            heart
          </Icon>
          <Icon className="favorite-icon" color="primary" variant="small">
              heart-filled
            </Icon>
        </FlexBox> */}

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imgUrl}
              width="100%"
              height="auto"
              layout="responsive"
              alt={title}
            />
          </a>
        </Link>
      </div>
      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px">
            <Link href={`/product/${id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  mb="10px"
                  title={title}
                >
                  {title}
                </H3>
              </a>
            </Link>

            {/* <Rating value={rating || 0} outof={5} color="warn" readonly /> */}

            <FlexBox alignItems="center" mt="10px" justifyContent="space-between">
              {/* <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                ₹{(price - (price * off) / 100).toFixed(2)}
              </SemiSpan> */}
              <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                ₹{(price).toFixed(2)}
              </SemiSpan>
              {/* {!!off && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del>{price?.toFixed(2)}</del>
                </SemiSpan>
              )} */}
              <FlexBox
                flexDirection="row-reverse"
                alignItems="center"
                justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}
                width="30px"
              >
                {/* <div className="add-cart"> */}
                <Button
                  variant="outlined"
                  color="primary"
                  padding="3px"
                  size="none"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
                >
                  <Icon variant="small">plus</Icon>
                </Button>

                {!!cartItem?.qty && (
                  <Fragment>
                    <SemiSpan color="text.primary" fontWeight="600" mx="3px">
                      {cartItem?.qty}
                    </SemiSpan>
                    <Button
                      variant="outlined"
                      color="primary"
                      padding="3px"
                      size="none"
                      borderColor="primary.light"
                      onClick={handleCartAmountChange(cartItem?.qty - 1)}
                    >
                      <Icon variant="small">minus</Icon>
                    </Button>
                  </Fragment>
                )}
              </FlexBox>
            </FlexBox>
          </Box>


        </FlexBox>
      </div>

      {/* <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" position="relative">
          <ProductIntro imgUrl={[imgUrl]} title={title} price={price} id={id} />
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
            <Icon
              className="close"
              color="primary"
              variant="small"
              onClick={toggleDialog}
            >
              close
            </Icon>
          </Box>
        </Card>
      </Modal> */}
    </StyledProductCard1>
  );
};

ProductCard1.defaultProps = {
  id: '324321',
  title: 'TGFC',
  imgUrl: '/assets/images/products/tgfc.png',
  off: 50,
  price: 99999,
  rating: 0,
};

export default ProductCard1;
