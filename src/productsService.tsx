import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import request from '@kds/react-native-request';
import { useQuery } from 'react-query';
import { setIsServer } from '@tanstack/react-query/build/lib/__tests__/utils';

// const [isLoading, setLoading] = useState(true);
// const [productData, setProductData] = useState([]);

const PRODUCTS = [
    {
        id: 100,
        name: 'ReactProX Headset',
        price: 350,
        image: require('../images/products/headset.png'),
        description:
            'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
    },
    {
        id: 101,
        name: 'FastLane Toy Car',
        price: 600,
        image: require('../images/products/car.png'),
        description:
            'A model car, or toy car, is a miniature representation of an automobile. Other miniature motor vehicles, such as trucks, buses, or even ATVs, etc. are often included in this general category.',
    },
    {
        id: 102,
        name: 'SweetHome Cupcake',
        price: 2,
        image: require('../images/products/cake.png'),
        description:
            'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.',
    },
];

export function getProducts() {
    return PRODUCTS;
}

export function useGetProducts(param) {
    const [isLoading, setLoading] = useState(true);
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        console.log('KK console use request');
        request({
            url: 'https://run.mocky.io/v3/d8ad055d-0150-41aa-9820-61ef5d467970',
            method: 'GET',
            responseType: 'string',
        }).then((response) => {
            let data_ = JSON.stringify(JSON.parse(response.data));

            setProductData(JSON.parse(data_).itemList);
            setLoading(false);
        });
    }, [param]);

    return [productData, isLoading];
}

export function useGetProduct(id) {
    const [productData, isLoading] = useGetProducts(null);
    console.log(
        'KK console 86',
        productData.find((product) => product.itemId === id),
    );

    return productData.find((product) => product.itemId === id);
}

export function Product({
    onPress,
    itemImage,
    itemName,
    itemPrice,
    itemCityName,
    itemDistance,
}) {
    // console.log('KK console products Server item', typeof item, item);
    // console.log('KK console products Server onPress', typeof onPress, onPress);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image style={styles.thumb} source={{ uri: itemImage }} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{itemName}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={styles.price}>¥ {itemPrice}</Text>
                    <Text style={styles.cityName}>
                        {itemCityName}-{itemDistance}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

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
    thumb: {
        height: 260,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
        textAlign: 'left',
    },
    cityName: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 8,
        textAlign: 'right',
    },
});
