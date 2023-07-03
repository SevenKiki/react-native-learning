import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CartContext } from '@/CartContext';
import {
    getItemsCount,
    getIotalPrice,
    itemsReducer,
    itemsTotalCountReducer,
} from '@/store/reducer/items';
import store from '@/store/store';

export function CartIcon({ navigation }) {
    const [totalCount, setTotalCount] = useState(
        store.getState().itemsTotalCountReducer,
    );

    store.subscribe(() => {
        console.log('state changed!');
        setTotalCount(store.getState().itemsTotalCountReducer);
    });
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
                onPress={() => {
                    navigation.navigate('Cart');
                }}
            >
                {/*Cart ({getItemsCount(store.getState().itemsReducer)})*/}
                Cart ({totalCount})
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        backgroundColor: 'orange',
        height: 32,
        padding: 6,
        borderRadius: 32 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
});
