import { useState } from 'react';
import { useQuery } from 'react-query';
import { queryProductsData } from '@/QueryProvider';
import { toNumber } from 'lodash-es';

import { combineReducers } from 'redux';

export function getItemsCount(items) {
    var count = 0;
    for (const item of items) {
        count += item.qty;
    }
    return count;
}

export function getTotalPrice(items) {
    console.log('get total price::', items);
    var sum = 0;
    for (const item of items) {
        sum += item.totalPrice;
    }
    return sum;
}

export const productReducer = (state = [], action) => {
    function setProducts() {
        const productsQuery = useQuery(['productsData'], queryProductsData, {
            staleTime: 5 * 60 * 1000,
        });
        if (productsQuery) {
            return productsQuery;
        }
    }

    switch (action.type) {
        case 'GET':
            return setProducts();
        default:
            return state;
    }
};

function prevItemsAddQty(id, prevItems, price) {
    const newItems = [];
    for (const item of prevItems) {
        console.log(' item::', item);
        if (item.id === id) {
            item.qty++;
            item.totalPrice += price;
        }
        console.log(' item::', item);
        newItems.push(item);
    }
    return newItems;
}

export const itemsReducer = (state = [], action) => {
    const product = action.product;
    const id = product?.itemId;

    function setItems(prevItems) {
        const item = prevItems?.find((item) => item.id === id);
        const price: number = product.marketingClientElementJson
            ? toNumber(
                  JSON.parse(product.marketingClientElementJson).priceInfo
                      .buyPrice.price.text,
              )
            : toNumber(10);

        if (!item) {
            return [
                ...prevItems,
                {
                    id,
                    qty: 1,
                    name: product?.itemName,
                    totalPrice: price,
                },
            ];
        } else {
            return prevItemsAddQty(id, prevItems, price);
        }
    }

    switch (action.type) {
        case 'ADD':
            return setItems(state);
        default:
            return state;
    }
};
export const itemsTotalCountReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADDCOUNT':
            return state + 1;
        default:
            return state;
    }
};
export const rootReducer = combineReducers({
    productReducer,
    itemsReducer,
    itemsTotalCountReducer,
});
