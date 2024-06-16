import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import PlanningNavigator from './PlanningNavigator';
import InspirationNavigator from './InspirationNavigator';
import SettingsNavigator from './SettingsNavigator';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.light.tabIconDefault,
                tabBarLabelStyle: {
                    fontFamily: 'mon-sb',
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'My Wedding',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Planning"
                component={PlanningNavigator}
                options={{
                    tabBarLabel: 'Planning',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Inspiration"
                component={InspirationNavigator}
                options={{
                    tabBarLabel: 'Inspiration',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="lightbulb-on-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="decagram-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainNavigator;
