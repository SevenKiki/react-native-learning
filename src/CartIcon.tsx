import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from '@/store/store';

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
export function CartIcon({ navigation }) {
    const [totalCount, setTotalCount] = useState(
        store.getState().itemsTotalCountReducer,
    );

    useEffect(() => {
        const subscribe = store.subscribe(() => {
            console.log('state changed!');
            setTotalCount(store.getState().itemsTotalCountReducer);
        });
        return () => {
            subscribe();
        };
    }, []);

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
