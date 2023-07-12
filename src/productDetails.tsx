import React from 'react';
import {
    Text,
    Image,
    View,
    ScrollView,
    SafeAreaView,
    Button,
    StyleSheet,
} from 'react-native';

import { useQuery } from 'react-query';
import { queryProductsData } from '@/QueryProvider';
import store from '@/store/store';

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
    },
    image: {
        height: 300,
        width: '100%',
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#787878',
        marginBottom: 20,
        marginTop: 20,
    },
});

export function ProductDetails({ route }) {
    const { productId } = route.params;

    // const { useAddItemToCart } = useContext(CartContext);

    // const [products, isloading] = useGetProducts(null);
    const productsQuery = useQuery(['productsData'], queryProductsData, {
        staleTime: 5 * 60 * 1000,
    });
    const products = productsQuery.data;
    const isLoading = productsQuery.isLoading;
    const isFetching = productsQuery.isFetching;

    const product = products?.find((product) => product.itemId === productId);

    function onAddToCart() {
        // addItemToCart(product);
        store.dispatch({
            type: 'ADD',
            product: product,
        });
        console.log(
            'KK consoel after add to cart',
            store.getState().itemsReducer,
        );
        store.dispatch({
            type: 'ADDCOUNT',
        });
    }

    function renderProductDetails() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Image
                        style={styles.image}
                        source={{ uri: product?.itemImage }}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}> {product?.itemName} </Text>
                        <Text style={styles.description}>
                            {product.sellerName}
                            商家在本平台展示的商品/服务的售价，如存疑请先咨询提供价格的商家。实际成交价格可能会因为使用优惠券而发生变化
                        </Text>
                        <Button onPress={onAddToCart} title="加购" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
    function renderIsLoading() {
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

    return isLoading || isFetching ? renderIsLoading() : renderProductDetails();
}
