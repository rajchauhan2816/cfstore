import { useAppSelector } from '@/app/hooks';
import { initCart } from '@/store/cart';
import React, { useEffect } from 'react'

/**
 * 
 * @description Cart Provider
 */
const CartProvider: React.FC = ({ children }) => {

    const { isFirstTime, accountDetails: { mobile } } = useAppSelector(state => state.accountDetails);

    useEffect(() => {

        if (mobile && !isFirstTime) {
            initCart();
        }

    }, [isFirstTime])

    return <>{children}</>
}

export default CartProvider