import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { ImageItem } from '../interfaces/ImageItem';

const images: ImageItem[] = [
    { id: '1', source: require('../assets/image1.jpg'), height: 200 },
    { id: '2', source: require('../assets/image2.jpg'), height: 300 },
    { id: '3', source: require('../assets/image3.jpg'), height: 150 },
    { id: '4', source: require('../assets/image4.jpg'), height: 250 },
    { id: '5', source: require('../assets/image5.jpg'), height: 300 },
    { id: '6', source: require('../assets/image6.jpg'), height: 180 },
    { id: '7', source: require('../assets/image7.jpg'), height: 220 },
    { id: '8', source: require('../assets/image8.jpg'), height: 270 },
];

const InspirationScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <MasonryList
                data={images}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }: { item: ImageItem }) => (
                    <View style={[styles.item, { height: item.height }]}>
                        <Image source={item.source} style={styles.image} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        paddingTop: 100,
    },
    item: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default InspirationScreen;
