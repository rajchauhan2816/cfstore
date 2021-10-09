import Footer from "@component/footer/Footer";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
import Head from "next/head";
import React from "react";
import GroceryHeader from "../header/GroceryHeader";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
};

const AppLayout: React.FC<Props> = ({
  children,
  navbar,
  title = "The Good Fish Company",
}) => (
  <StyledAppLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    {/* <Topbar /> */}

    <Sticky fixedOn={0}>
      <GroceryHeader />
    </Sticky>

    {navbar && <div className="section-after-sticky">{navbar}</div>}
    {!navbar ? (
      <div className="section-after-sticky">{children}</div>
    ) : (
      children
    )}

    <MobileNavigationBar />
    <Footer />
  </StyledAppLayout>
);

export default AppLayout;
