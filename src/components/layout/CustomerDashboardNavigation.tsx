import Box from "@component/Box";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";
import { logout } from '@/store/auth'
import { useAppDispatch } from "@/app/hooks";
import { clearAccountDetails } from "@/store/account-details";

const CustomerDashboardNavigation = () => {
  const { pathname } = useRouter();

  // Handles Signout
  const dispatch = useAppDispatch()
  const handleSignout = () => {
    dispatch(logout());
    dispatch(clearAccountDetails());
  };
  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>
          {item.list.map((item) => (
            <StyledDashboardNav
              isCurrentPath={pathname.includes(item.href)}
              href={item.href}
              key={item.title}
              px="1.5rem"
              mb="1.25rem"
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </Box>
                <span>{item.title}</span>
              </FlexBox>
              {/* <span>{item.count}</span> */}
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
      <br />
      <StyledDashboardNav href="/" px="1.5rem" mb="1.25rem">
        <Button variant="text" color="primary" onClick={handleSignout} >Sign Out</Button>
      </StyledDashboardNav>
    </DashboardNavigationWrapper>
  );
};

const linkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/orders",
        title: "Orders",
        iconName: "bag",
        // count: 5,
      },
      // {
      //   href: "/wish-list",
      //   title: "Wishlist",
      //   iconName: "heart",
      //   count: 19,
      // },
      // {
      //   href: "/support-tickets",
      //   title: "Support Tickets",
      //   iconName: "customer-service",
      //   count: 1,
      // },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        iconName: "user",
        // count: 3,
      },
      {
        href: "/address",
        title: "Addresses",
        iconName: "pin",
        // count: 16,
      },
      // {
      //   href: "/payment-methods",
      //   title: "Payment Methods",
      //   iconName: "credit-card",
      //   count: 4,
      // },
    ],
  },
];

export default CustomerDashboardNavigation;
