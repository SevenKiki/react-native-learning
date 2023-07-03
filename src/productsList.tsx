import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Product } from '@/productsService';

// import { queryProductsData } from '@/QueryProvider';
// import { useQuery } from 'react-query';
import store from '@/store/store';

export function ProductsList({ navigation }) {
    // const [products, isLoading] = useGetProducts(null);
    store.dispatch({
        type: 'GET',
    });
    const productsQueryData = store.getState().productReducer;

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
        // console.log('KK console products:', products);
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
