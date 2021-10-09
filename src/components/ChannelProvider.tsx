import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setDemographic } from "@/store/demographic";
import { useRouter } from "next/router";
import React from "react";

interface ChannelProps {
    channel: string
    affiliateId: string
    resellerId: string
}

const ChannelProvider: React.FC<ChannelProps> = ({ children, affiliateId = "", channel, resellerId = "" }) => {

    const { push } = useRouter();

    const dispatch = useAppDispatch();

    /**
     * Checking if channel exists in URL
     */
    if (channel) {
        dispatch(setDemographic({
            channel: channel.toString(),
            affiliateId: affiliateId.toString(),
            resellerId: resellerId.toString()
        }))
    }

    const { channel: _channel } = useAppSelector(store => store.demographic)

    /**
     * If Channel doesn't exist in url and store redirect user to 404
     */
    if (!_channel) {
        push("/404")
        return <></>
    }

    return <>
        {children}
    </>;
};

export default ChannelProvider;
