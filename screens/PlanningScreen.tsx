import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { Event } from '../interfaces/Event';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlanningScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState('');
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
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
        loadEvents();
    }, []);

    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString);
        setModalVisible(true);
    };

    const handleAddNote = async () => {
        const newEvent = {
            id: new Date().toISOString(),
            date: selectedDate,
            note,
            timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
        setModalVisible(false);
        setNote('');
    };

    const handleDeleteNote = async (id: string) => {
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const renderEvent = ({ item }: { item: Event }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventNote}>{item.note}</Text>
            <Text style={styles.eventTimestamp}>{item.timestamp}</Text>
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...events.reduce((acc, event) => {
                        acc[event.date] = { marked: true };
                        return acc;
                    }, {}),
                    [selectedDate]: { selected: true, marked: true, selectedColor: '#ff6699' },
                }}
                theme={{
                    calendarBackground: '#fff',
                    selectedDayBackgroundColor: '#ffccff',
                    todayTextColor: '#cc0088',
                    arrowColor: '#ff6699',
                    monthTextColor: '#ff6699',
                    textSectionTitleColor: '#ff6699',
                    dayTextColor: '#ff6699',
                    textDisabledColor: '#d9e1e8',
                    selectedDayTextColor: '#fff',
                    dotColor: '#ff6699',
                    selectedDotColor: '#ffffff',
                    indicatorColor: '#ff6699',
                }}
            />
            <View style={styles.eventListContainer}>
                <Text style={styles.todayText}>Today</Text>
                <FlatList
                    data={events.filter(event => event.date === selectedDate)}
                    renderItem={renderEvent}
                    keyExtractor={(item) => item.id}
                    style={styles.eventsList}
                    ListEmptyComponent={<Text style={styles.noEventsText}>No notes for this day.</Text>}
                />
            </View>
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add Note for {selectedDate}</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter note"
                            value={note}
                            onChangeText={setNote}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
                                <Text style={styles.addButtonText}>Add Note</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 100,
    },
    eventListContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        elevation: 5,
    },
    todayText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ff6699',
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
    eventNote: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventTimestamp: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    deleteButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
    noEventsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#ff6699',
    },
    modalInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    addButton: {
        backgroundColor: '#ff6699',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#000',
        fontSize: 16,
    },
});

export default PlanningScreen;
