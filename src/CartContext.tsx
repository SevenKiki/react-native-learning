import React, { createContext, useState } from 'react';
import { toNumber } from 'lodash-es';
import { useQuery } from 'react-query';
import { queryProductsData } from '@/QueryProvider';

import store from '@/store/store';
import { ADD_ITEM } from '@/store/action/items';
export const CartContext = createContext(null);

export default function CartProvider(props) {
    const [items, setItems] = useState([]);

    const productsQuery = useQuery(['productsData'], queryProductsData, {
        staleTime: 5 * 60 * 1000,
    });
    const productsData = productsQuery.data;
    const isLoading = productsQuery.isLoading;
    const isFetching = productsQuery.isFetching;
    function useAddItemToCart(id) {
        console.log('add item to catr !');

        // @ts-ignore
        const product = productsData?.find((product) => product.itemId === id);
        console.log('isLoading', isLoading);

        if (!isLoading && !isFetching) {
            setItems((prevItems) => {
                const item = prevItems?.find((item) => item.itemId === id);
                const price: number = product.marketingClientElementJson
                    ? toNumber(
                          JSON.parse(product.marketingClientElementJson)
                              .priceInfo.buyPrice.price.text,
                      )
                    : toNumber(0);
                if (!item) {
                    console.log('KK console log: there is no product in cart!');

                    return [
                        ...prevItems,
                        {
                            id,
                            qty: 1,
                            product,
                            totalPrice: price,
                        },
                    ];
                } else {
                    return prevItems.map((item) => {
                        if (item.itemId === id) {
                            item.qty++;
                            item.totalPrice += price;
                        }
                        return item;
                    });
                }
            });
        }
    }

    function getItemsCount() {
        // array,reduce(callback,initialValue)
        const count = items.reduce((sum, item) => sum + item.qty, 0);
        return count;
    }

    function getTotalPrice() {
        return items.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                setItems,
                getItemsCount,
                useAddItemToCart,
                getTotalPrice,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
