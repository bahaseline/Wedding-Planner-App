import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InspirationScreen from '../screens/InspirationScreen';

const Stack = createNativeStackNavigator();

const InspirationNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InspirationMain" component={InspirationScreen} options={{ title: 'Inspiration' }} />
        </Stack.Navigator>
    );
};

export default InspirationNavigator;
