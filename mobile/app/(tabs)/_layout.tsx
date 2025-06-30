import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const _layout = () => {
    return (
        <Tabs screenOptions={{ tabBarInactiveTintColor: 'black' }}>
            <Tabs.Screen name='index' options={{
                title: 'Home',
                headerShadowVisible: false,
                headerStyle: {
                    borderWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomColor: "orange",
                    borderBottomWidth: 2,
                    
                },
                headerShown: true,
                tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />
            }} />
            <Tabs.Screen name='payment' options={{
                title: 'Payment',
                headerShadowVisible: false,
                headerStyle: {
                    borderWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomColor: "orange",
                    borderBottomWidth: 2,
                    
                },
                headerShown: true,
                tabBarIcon: ({ color }) => <MaterialIcons size={28} name="payment" color={color} />
            }} />
            <Tabs.Screen name='transact' options={{
                title: 'Transact',
                headerShadowVisible: false,
                headerStyle: {
                    borderWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomColor: "orange",
                    borderBottomWidth: 2
                },
                headerShown: true,
                tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="arrow-right-arrow-left" color={color} />
            }} />
            <Tabs.Screen name='account' options={{
                title: 'Account',
                headerStyle: {
                    borderWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomColor: "orange",
                    borderBottomWidth: 2
                },
                headerShadowVisible: false,
                headerShown: true,
                tabBarIcon: ({ color }) => <MaterialIcons size={28} name="account-circle" color={color} />
            }} />
        </Tabs>
    )
}

export default _layout
