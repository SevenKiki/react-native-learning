import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ProductsList } from '@/productsList';
import { ProductDetails } from '@/productDetails';

import { Cart } from '@/Cart';
import { CartIcon } from '@/CartIcon';
import { queryClient } from '@/QueryProvider';
import { QueryClientProvider } from 'react-query';

const Stack = createStackNavigator();

// const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
    },
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/*<CartProvider>*/}
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Products"
                        component={ProductsList}
                        options={({ navigation }) => ({
                            title: 'Products',
                            headerTitleStyle: styles.headerTitle,
                            headerRight: () => (
                                <CartIcon navigation={navigation} />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="ProductDetails"
                        component={ProductDetails}
                        options={({ navigation }) => ({
                            title: 'Product details',
                            headerTitleStyle: styles.headerTitle,
                            headerRight: () => (
                                <CartIcon navigation={navigation} />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Cart"
                        component={Cart}
                        options={({ navigation }) => ({
                            title: 'My cart',
                            headerTitleStyle: styles.headerTitle,
                            // ts-ignore
                            headerRight: () => (
                                <CartIcon navigation={navigation} />
                            ),
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            {/*</CartProvider>*/}
        </QueryClientProvider>
    );
};

AppRegistry.registerComponent('demo', () => App);
