import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { Fragment, useEffect, useState } from "react";
import Box from "./Box";
import Modal from "./modal/Modal";
import Login from "./sessions/Login";
import { generateOtp, validateOtp } from '@/store/auth'
import { useRouter } from "next/router";
import { fetchAccountDetails } from "@/store/account-details";


const AuthProvider: React.FC = ({ children, }) => {

    const [open, setOpen] = useState(false);

    const { isLoggedIn } = useAppSelector(store => store.auth)


    const dispatch = useAppDispatch()
    const { pathname } = useRouter();
    function handleValidate(params: { mobile: string, authCode: string, otp: string }) {
        dispatch(validateOtp(params))
    }

    useEffect(() => {
        setOpen(!isLoggedIn)

        if (isLoggedIn) {
            dispatch(fetchAccountDetails())
        }
    }, [isLoggedIn])

    return <>
        {(pathname === '/checkout' || pathname === '/profile' || pathname === '/address') ? <Fragment>
            <Modal open={open} onClose={() => { }}>
                <Box>
                    <Login login={generateOtp} validate={handleValidate} />
                </Box>
            </Modal>
            {children}
        </Fragment> : <div>{children}</div>}
    </>;
}

export default AuthProvider