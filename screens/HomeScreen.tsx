import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Colors } from "../constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../interfaces/Event';

const HomeScreen: React.FC = () => {
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState<Event[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadEvents = async () => {
        try {
            const eventsString = await AsyncStorage.getItem('events');
            if (eventsString) {
                setEvents(JSON.parse(eventsString));
            }
        } catch (error) {
            console.error('Failed to load events', error);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadEvents();
        setRefreshing(false);
    }, []);

    const renderEvent = ({ item }: { item: Event }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.note}</Text>
            <Text style={styles.eventDate}>{item.timestamp}</Text>
        </View>
    );

    const renderItem = ({ item }: { item: any }) => {
        switch (item.type) {
            case 'header':
                return (
                    <View style={styles.header}>
                        <Text style={styles.greeting}>Hi, Nefeli!</Text>
                        <Text style={styles.subtitle}>Plan Your Perfect Wedding</Text>
                    </View>
                );
            case 'search':
                return (
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search here..."
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                );
            case 'categories':
                return (
                    <View style={styles.categories}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <View style={styles.categoryRow}>
                            <CategoryItem title="Venue" image={require('../assets/venue.jpg')} />
                            <CategoryItem title="Catering" image={require('../assets/catering.jpg')} />
                            <CategoryItem title="Accessories" image={require('../assets/accessories.jpg')} />
                            <CategoryItem title="Invitations" image={require('../assets/invitations.jpg')} />
                        </View>
                    </View>
                );
            case 'recommendation':
                return (
                    <View style={styles.recommendation}>
                        <Text style={styles.sectionTitle}>Recommended For You</Text>
                        <View style={styles.recommendationCard}>
                            <Image style={styles.recommendationImage} source={require('../assets/wedding-dress.jpg')} />
                            <View style={styles.recommendationDetails}>
                                <Text style={styles.recommendationText}>25% OFF</Text>
                                <Text style={styles.recommendationSubtext}>Super Discount</Text>
                                <TouchableOpacity style={styles.learnMoreButton}>
                                    <Text style={styles.learnMoreText}>Learn More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            case 'upcomingEvents':
                return (
                    <View style={styles.upcomingEvents}>
                        <Text style={styles.sectionTitle}>Upcoming Events</Text>
                        <FlatList
                            data={events}
                            renderItem={renderEvent}
                            keyExtractor={(item) => item.id}
                            style={styles.eventsList}
                            ListEmptyComponent={<Text style={styles.noEventsText}>No upcoming events.</Text>}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    const listData = [
        { type: 'header' },
        { type: 'search' },
        { type: 'categories' },
        { type: 'recommendation' },
        { type: 'upcomingEvents' },
    ];

    return (
        <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.container}
        />
    );
};

const CategoryItem: React.FC<{ title: string; image: any }> = ({ title, image }) => (
    <View style={styles.categoryItem}>
        <Image source={image} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 100,
    },
    header: {
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.tabIconDefault,
    },
    subtitle: {
        fontSize: 16,
        color: '#7D7D7D',
    },
    searchContainer: {
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchInput: {
        backgroundColor: '#ffe6f2',
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        fontSize: 18,
    },
    categories: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryItem: {
        alignItems: 'center',
        width: 80,
    },
    categoryImage: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    categoryText: {
        fontSize: 14,
        textAlign: 'center',
    },
    recommendation: {
        marginBottom: 20,
    },
    recommendationCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF2F2',
        borderRadius: 10,
        padding: 10,
    },
    recommendationImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    recommendationDetails: {
        justifyContent: 'center',
    },
    recommendationText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recommendationSubtext: {
        fontSize: 14,
        color: '#7D7D7D',
        marginBottom: 10,
    },
    learnMoreButton: {
        backgroundColor: Colors.light.tabIconDefault,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    learnMoreText: {
        color: '#fff',
        fontSize: 14,
    },
    upcomingEvents: {
        marginBottom: 20,
    },
    eventsList: {
        marginTop: 10,
    },
    eventItem: {
        padding: 15,
        backgroundColor: '#ffe6f2',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventDate: {
        fontSize: 14,
        color: '#7D7D7D',
    },
    noEventsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

export default HomeScreen;
