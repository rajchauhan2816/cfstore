import AddressEditor from "@component/address/AddressEditor";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import React from "react";

const AddressUpdater = () => {
  //TODO: fetch query then pass to address Editor
  return <AddressEditor />;
};


// AddressUpdater.getInitialProps = ({ ctx }: { ctx: NextPageContext }) => {
//   const { query, pathname } = ctx
//   return { query, pathname }
// }
AddressUpdater.layout = DashboardLayout;

export default AddressUpdater;
