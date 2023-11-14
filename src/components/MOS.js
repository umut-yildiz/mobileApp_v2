import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Critical from './Critical';
import Warning from './Warning';
import Status from './Status';

const Tab = createBottomTabNavigator();

const MOS = () => {

    return (
        <Tab.Navigator
            initialRouteName="Status"
            screenOptions={{
                tabBarStyle: {
                    height: 50,
                    backgroundColor: '#013A71',
                },
            }}
        >
            <Tab.Screen
                name="Critical"
                component={Critical}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#E74C3C' : 'white' }}>Critical</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="alarm-light" color={focused ? '#E74C3C' : 'white'} size={35} />
                    ),
                    tabBarBadge: 6,
                }}
            />
            <Tab.Screen
                name="Status"
                component={Status}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#28B463' : 'white' }}>Status</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="bell-check-outline" color={focused ? '#28B463' : 'white'} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Warning"
                component={Warning}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#F39C12' : 'white' }}>Warning</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="alert" color={focused ? '#F39C12' : 'white'} size={30} />
                    ),
                    tabBarBadge: 5,
                }}
            />
        </Tab.Navigator>
    );
};

export default MOS;
