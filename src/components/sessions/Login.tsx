import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useFormik } from "formik";

import React, { useEffect, useState } from "react";
import * as yup from "yup";

import Button from "../buttons/Button";

import TextField from "../text-field/TextField";
import { H3, H5 } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

import { removeError } from '@/store/auth'

interface LoginProps {
  login: (params: { mobile: string }) => Promise<{ authCode: string, errors: string[] }>;
  validate: (params: { mobile: string, authCode: string, otp: string }) => void
}

const Login: React.FC<LoginProps> = ({ login, validate }) => {

  const [authCode, setAuthCode] = useState("")

  const { loading, error } = useAppSelector(store => store.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(removeError())
  }, [])

  // const [passwordVisibility, setPasswordVisibility] = useState(false);
  // const router = useRouter();

  // const togglePasswordVisibility = useCallback(() => {
  //   setPasswordVisibility((visible) => !visible);
  // }, []);


  const handleFormSubmit = async (values) => {

    if (!authCode) {
      try {
        const { authCode: atCode, errors } = await login({ mobile: values.phone })
        if (errors.length > 0) throw errors[0]
        setAuthCode(atCode)
        values.otp = ""
      } catch (error) {
        console.log(error.message);
      }
    }
    else {
      // Validate
      validate({ authCode, mobile: values.phone, otp: values.otp })
      if (error) {
        console.log("Error", error);
        //errors.otp = "Invalid OTP";
      }
    }

    // router.push("/profile");
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Welcome To The Good Fish Company
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Log in with phone number
        </H5>

        {error ? <p style={{ color: 'red' }}>{error}</p> : null}

        <TextField
          disabled={!!authCode}
          mb="0.75rem"
          name="phone"
          label="Phone Number"
          type="tel"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone || "+91"}
          errorText={touched.phone && errors.phone}
        />
        {authCode ? <TextField
          disabled={loading}
          mb="0.75rem"
          name="otp"
          placeholder="9999"
          label="OTP"
          type="text"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.otp || ""}
          errorText={touched.otp && errors.otp}
        /> : ''}
        {/* <TextField
          mb="1rem"
          name="password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          label="Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
        /> */}

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          {loading ? 'Loading...' : authCode ? 'Verify' : 'Send OTP'}
        </Button>
      </form>
    </StyledSessionCard>
  );
};

const initialValues = {
  phone: "",
  otp: "0000"
};

const formSchema = yup.object().shape({
  phone: yup.string().required("${path} is required").test(
    "len",
    "Phone number must be exactly 10 characters",
    (val) => val?.length === 13
  ),
  otp: yup.string().required("${path} is required")
});

export default Login;
