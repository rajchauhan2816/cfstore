import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setIsOpen } from '@/store/date-pincode';
import React, { useEffect} from 'react';
import Link from "next/link";
import Button from '../buttons/Button';
import Container from '../Container';
import FlexBox from '../FlexBox';
import Icon from '../icon/Icon';
// import Image from '../Image';
// import Menu from '../Menu';
// import MenuItem from '../MenuItem';
// import { Small } from '../Typography';
import StyledTopbar from './Topbar.style';

const Topbar: React.FC = () => {
  // const [currency, setCurrency] = useState(currencyList[0]);
  // const [language, setLanguage] = useState(languageList[0]);

  // const handleCurrencyClick = (curr) => () => {
  //   setCurrency(curr);
  // };

  // const handleLanguageClick = (lang) => () => {
  //   setLanguage(lang);
  // };
  const { deliveryDate, pincode} = useAppSelector(store => store.datePincode)
  const dispatch = useAppDispatch();
  const handleDatePinClick = () => {
    dispatch(setIsOpen(true));
  }

  useEffect(() => {
    // get language from browser
    // console.log(navigator.language);
  }, []);
  return (
    <StyledTopbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <FlexBox className="topbar-left">
          <Link href="/">
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="logo" />
          </div>
          </Link>
          <FlexBox alignItems="center">
            <Icon size="14px">phone-call</Icon>
            <span>+9199999 99999</span>
          </FlexBox>
          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px">mail</Icon>
            <span>support@captainfresh.com</span>
          </FlexBox>
        </FlexBox>
        <FlexBox className="topbar-right" alignItems="center">
          {/* <NavLink className="link" href="/faq">
            Theme FAQ's
          </NavLink>
          <NavLink className="link" href="/help">
            Need Help?
          </NavLink>
          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
                mr="1.25rem"
              >
                <Image src={language.imgUrl} alt={language.title} />
                <Small fontWeight="600">{language.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {languageList.map((item) => (
              <MenuItem key={item.title} onClick={handleLanguageClick(item)}>
                <Image
                  src={item.imgUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>
          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
              >
                <Image src={currency.imgUrl} alt={currency.title} />
                <Small fontWeight="600">{currency.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {currencyList.map((item) => (
              <MenuItem key={item.title} onClick={handleCurrencyClick(item)}>
                <Image
                  src={item.imgUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu> */}

          <Button my="0.3rem"
            px="1.5rem"
            py="2px"
            variant="contained"
            color="primary"
            type="button"
            fullwidth
            onClick={handleDatePinClick}
          >
            <FlexBox alignItems="center" pr="15px">
              <Icon size="20px" pr="2px">truck</Icon>
              {<span className="bigScreen">Delivery Date: {deliveryDate}</span>}
              {<span className="smallScreen">{deliveryDate}</span>}
            </FlexBox>

            <FlexBox alignItems="center" pl="15px">
              <Icon size="15px">map-pin (2)</Icon>
              <span className="bigScreen">Deliver At: {pincode}</span>
              <span className="smallScreen">{pincode}</span>
            </FlexBox>
          </Button>
        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};

// const languageList = [
//   {
//     title: 'EN',
//     imgUrl: '/assets/images/flags/usa.png',
//   },
//   {
//     title: 'BN',
//     imgUrl: '/assets/images/flags/bd.png',
//   },
//   {
//     title: 'HN',
//     imgUrl: '/assets/images/flags/in.png',
//   },
// ];

// const currencyList = [
//   {
//     title: 'USD',
//     imgUrl: '/assets/images/flags/usa.png',
//   },
//   {
//     title: 'EUR',
//     imgUrl: '/assets/images/flags/uk.png',
//   },
//   {
//     title: 'BDT',
//     imgUrl: '/assets/images/flags/bd.png',
//   },
//   {
//     title: 'INR',
//     imgUrl: '/assets/images/flags/in.png',
//   },
// ];

export default Topbar;
