import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Skip = ({ navigation }) => (
    <TouchableOpacity style={styles.skipButton} onPress={() => navigation.replace('MainNavigator')}>
        <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
);

const Next = (props) => (
    <TouchableOpacity style={styles.nextButton} {...props}>
        <Text style={styles.nextText}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ navigation }) => (
    <TouchableOpacity style={styles.doneButton} onPress={() => navigation.replace('MainNavigator')}>
        <Text style={styles.doneText}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = () => {
    const navigation = useNavigation();

    return (
        <Onboarding
            SkipButtonComponent={(props) => <Skip {...props} navigation={navigation} />}
            NextButtonComponent={(props) => <Next {...props} />}
            DoneButtonComponent={(props) => <Done {...props} navigation={navigation} />}
            pages={[
                {
                    backgroundColor: '#fbe7e7',
                    image: (
                        <View style={styles.imageContainer}>
                            <Image source={require('../assets/onboarding1.jpg')} style={styles.image} />
                        </View>
                    ),
                    title: 'Find your place',
                    subtitle: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
                    titleStyles: styles.title,
                    subTitleStyles: styles.subtitle,
                },
                {
                    backgroundColor: '#ffd9df',
                    image: (
                        <View style={styles.imageContainer}>
                            <Image source={require('../assets/onboarding2.jpg')} style={styles.image} />
                        </View>
                    ),
                    title: 'Contact us anytime',
                    subtitle: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
                    titleStyles: styles.title,
                    subTitleStyles: styles.subtitle,
                },
                {
                    backgroundColor: '#e0e3ff',
                    image: (
                        <View style={styles.imageContainer}>
                            <Image source={require('../assets/onboarding3.jpg')} style={styles.image} />
                        </View>
                    ),
                    title: 'Pick your food',
                    subtitle: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
                    titleStyles: styles.title,
                    subTitleStyles: styles.subtitle,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: height / 2,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30,
    },
    title: {
        fontSize: 24,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    skipButton: {
        marginHorizontal: 20,
    },
    skipText: {
        fontSize: 16,
        color: '#ff6b6b',
    },
    nextButton: {
        marginHorizontal: 20,
        backgroundColor: '#ff6b6b',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    nextText: {
        fontSize: 16,
        color: '#fff',
    },
    doneButton: {
        marginHorizontal: 20,
        backgroundColor: '#ff6b6b',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    doneText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default OnboardingScreen;
