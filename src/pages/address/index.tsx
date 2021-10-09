import { useAddressDeleteMutation } from "@/api/address";
import { useAppSelector } from "@/app/hooks";
// import { fetchAccountDetails } from "@/store/account-details";
import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";

import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";

import Link from "next/link";
import React from "react";


// const DefaultAddress = () => {

//   return (
//     <Menu
//       direction='right'
//       handler={
//         <FlexBox
//           className='dropdown handler'
//           alignItems='center'
//           height='15px'
//           mr='1.25rem'
//         >
//           <Icon variant="small" defaultcolor="currentColor">
//             3-vertical-dots
//           </Icon>
//         </FlexBox>
//       }
//     >
//       <MenuItem >
//         {/* Functionality Enhancement */}
//         <Box>
//           <FlexBox>
//             Set As Default Shipping Address
//           </FlexBox>
//         </Box>
//       </MenuItem>
//       <MenuItem>
//         <Box>
//           <FlexBox>
//             Set As Default Billing Address
//           </FlexBox>
//         </Box>
//       </MenuItem>
//     </Menu>
//   );
// }

const AddressList = () => {
  const { accountDetails: { addresses } } = useAppSelector(store => store.accountDetails);
  // const dispatch = useAppDispatch();
  const handleDelete = async (addressId) => {
    const res = await useAddressDeleteMutation({
      accountAddressDeleteId: addressId
    })
    console.log(res);
    //TODO: Error Handling 
  }

  return (
    <div>
      <DashboardPageHeader
        title="My Addresses"
        iconName="pin_filled"

        button={
          <Link href="/address/create" >
            <Button color="primary" bg="primary.light" px="2rem">
              Add New Address
            </Button>
          </Link>
        }
      />

      {addresses?.map((address, idx) => (
        <TableRow my="1rem" padding="6px 18px" key={idx}>
          <Typography className="pre" m="6px" textAlign="left">
            {`${address.firstName} ${address.lastName}`}
          </Typography>
          <Typography flex="1 1 260px !important" m="6px" textAlign="left">
            {`${address.streetAddress1}, ${address.streetAddress2}, ${address.city}, ${address.countryArea}, ${address.postalCode}`}
          </Typography>
          <Typography className="pre" m="6px" textAlign="left">
            {address.phone}
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/address/${address.id}`}>
              <Typography as="a" href={`/address/${address.id}`} color="inherit">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small" onClick={() => { handleDelete(address.id) }}>
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
            {/* <IconButton size="small" onClick={() => { }}>
              <DefaultAddress />
            </IconButton> */}
          </Typography>
        </TableRow>
      ))}


      {/* <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox> */}
    </div>
  );
};

// const orderList = [
//   {
//     orderNo: "1050017AS",
//     status: "Pending",
//     purchaseDate: new Date(),
//     price: 350,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Processing",
//     purchaseDate: new Date(),
//     price: 500,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Delivered",
//     purchaseDate: "2020/12/23",
//     price: 700,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Delivered",
//     purchaseDate: "2020/12/23",
//     price: 700,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Cancelled",
//     purchaseDate: "2020/12/15",
//     price: 300,
//   },
// ];

AddressList.layout = DashboardLayout;

export default AddressList;
