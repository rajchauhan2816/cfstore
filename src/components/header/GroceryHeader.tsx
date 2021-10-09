import { useAppSelector } from "@/app/hooks";
import IconButton from "@component/buttons/IconButton";
import GrocerySearchBox from "@component/search-box/GrocerySearchBox";
import { Tiny } from "@component/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import MiniCart from "../mini-cart/MiniCart";
// import Login from "../sessions/Login";
import Sidenav from "../sidenav/Sidenav";
import StyledHeader from "./HeaderStyle";
// import UserLoginDialog from "./UserLoginDialog";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
};

const GroceryHeader: React.FC<HeaderProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const cartList = useAppSelector(store => store.cart.items)
  const { push } = useRouter();
  const cartHandle = (
    <FlexBox ml="20px" alignItems="flex-start">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!cartList.length && (
        <FlexBox
          borderRadius="300px"
          bg="error.main"
          px="5px"
          py="2px"
          alignItems="center"
          justifyContent="center"
          ml="-1rem"
          mt="-9px"
        >
          <Tiny color="white" fontWeight="600">
            {cartList.length}
          </Tiny>
        </FlexBox>
      )}
    </FlexBox>
  );

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <img src="/assets/images/logo.svg" alt="logo" />
            </a>
          </Link>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <GrocerySearchBox />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          <IconButton ml="1rem" bg="gray.200" p="8px" onClick={() => { push('/profile') }}>
            <Icon size="28px">user</Icon>
          </IconButton>
          {/* <UserLoginDialog
            handle={
              
            }
          >
            <Box>
              <Login />
            </Box>
          </UserLoginDialog> */}

          <Sidenav
            handle={cartHandle}
            position="right"
            open={open}
            width={380}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default GroceryHeader;
