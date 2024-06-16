import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/Colors';

const AboutUsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.description}>
                Welcome to our wedding planning app! We are dedicated to helping you plan your perfect wedding.
                Our app provides tools and resources to make your wedding planning journey smooth and enjoyable.
                Thank you for choosing us to be a part of your special day!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.tabIconDefault,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#7D7D7D',
        textAlign: 'center',
    },
});

export default AboutUsScreen;
