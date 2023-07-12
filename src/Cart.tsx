import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import store from '@/store/store';
import { getTotalPrice } from '@/store/reducer/items';

const styles = StyleSheet.create({
    cartLine: {
        flexDirection: 'row',
    },
    cartLineTotal: {
        flexDirection: 'row',
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
    },
    lineTotal: {
        fontWeight: 'bold',
    },
    lineLeft: {
        fontSize: 20,
        lineHeight: 40,
        color: '#333333',
    },
    lineRight: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 40,
        color: '#333333',
        textAlign: 'right',
    },
    itemsList: {
        backgroundColor: '#eeeeee',
    },
    itemsListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});

export function Cart({}) {
    const items = store.getState().itemsReducer;

    function Totals() {
        const total = getTotalPrice(items);

        return (
            <View style={styles.cartLineTotal}>
                <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
                <Text style={styles.lineRight}>¥ {total}</Text>
            </View>
        );
    }

    function renderItem({ item }) {
        return (
            <View style={styles.cartLine}>
                <Text style={styles.lineLeft}>
                    {item.name} x {item.qty}
                </Text>
                <Text style={styles.lineRight}>¥ {item.totalPrice}</Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListFooterComponent={Totals}
        />
    );
}
