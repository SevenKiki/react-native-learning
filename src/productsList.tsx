import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Product } from '@/productsService';

import store from '@/store/store';
import { useQuery } from 'react-query';
import { queryProductsData } from '@/QueryProvider';

export function ProductsList({ navigation }) {
    const productsQueryData = useQuery(['productsData'], queryProductsData, {
        staleTime: 5 * 60 * 1000,
        onSuccess: (data) => {
            store.dispatch({
                type: 'SET',
                productsData: data,
            });
        },
    });

    const products = productsQueryData?.data;
    const isLoading = productsQueryData?.isLoading;
    const isFetching = productsQueryData?.isFetching;

    function renderProduct({ item: product }) {
        const price = product.marketingClientElementJson
            ? JSON.parse(product.marketingClientElementJson).priceInfo.buyPrice
                  .price.text
            : 10;

        return (
            <Product
                onPress={() => {
                    navigation.navigate('ProductDetails', {
                        productId: product.itemId,
                    });
                }}
                itemImage={product.itemImage}
                itemName={product.itemName}
                itemPrice={price}
                itemCityName={product.poiCityName}
                itemDistance={product.distance}
            />
        );
    }
    function renderLoadingView() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Loading ... </Text>
            </View>
        );
    }
    function renderFlatlist() {
        return (
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.itemId.toString()}
                style={styles.productsList}
                contentContainerStyle={styles.productsListContainer}
            />
        );
    }

    return !(isLoading || isFetching) ? renderFlatlist() : renderLoadingView();
}

const styles = StyleSheet.create({
    productsList: {
        backgroundColor: '#eeeeee',
    },
    productsListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});
