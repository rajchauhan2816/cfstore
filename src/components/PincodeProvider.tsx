import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { useEffect, useState } from "react";
import DatePincodeDialog from "./topbar/DatePincodeDialog";
import { useRouter } from "next/router";
import { setIsOpen } from '@/store/date-pincode'


const PincodeProvider: React.FC = ({ children, }) => {

    const [open, setOpen] = useState(false);

    const { pincode, isOpen, deliveryDate:_ } = useAppSelector(store => store.datePincode)
    const dispatch = useAppDispatch()
    const { pathname, push } = useRouter();
    useEffect(() => {
        if (['/profile', '/checkout', '/address'].includes(pathname) && !pincode) {
            push('/');
        }
        setOpen(isOpen)
    }, [isOpen])

    useEffect(() => {
        if (pincode) {
            dispatch(setIsOpen(false))
        } else {
            dispatch(setIsOpen(true))
        }
    }, [])

    return <div>
        <DatePincodeDialog open={open} />
        {children}
    </div>
}

export default PincodeProvider