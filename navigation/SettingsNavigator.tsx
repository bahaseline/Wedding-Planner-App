import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const SettingsNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default SettingsNavigator;
