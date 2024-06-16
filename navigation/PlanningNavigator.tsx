import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanningScreen from '../screens/PlanningScreen';

const Stack = createNativeStackNavigator();

const PlanningNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlanningScreen" component={PlanningScreen} options={{ title: 'Planning' }} />
        </Stack.Navigator>
    );
};

export default PlanningNavigator;
