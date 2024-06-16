import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Colors } from '../constants/Colors'; // Ensure this path is correct
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingsScreen: React.FC = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <ScrollView style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <Text style={styles.headerText}>Settings</Text>*/}
            {/*</View>*/}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <TouchableOpacity style={styles.item}>
                    <MaterialCommunityIcons name="account" size={24} color={Colors.light.tabIconDefault} />
                    <Text style={styles.itemText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <TouchableOpacity style={styles.item}>
                    <MaterialCommunityIcons name="lock" size={24} color={Colors.light.tabIconDefault} />
                    <Text style={styles.itemText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <MaterialCommunityIcons name="logout" size={24} color={Colors.light.tabIconDefault} />
                    <Text style={styles.itemText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.item}>
                    <MaterialCommunityIcons name="bell" size={24} color={Colors.light.tabIconDefault} />
                    <Text style={styles.itemText}>Enable Notifications</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: Colors.light.tabIconDefault }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>More</Text>
                <TouchableOpacity style={styles.item}>
                    <MaterialCommunityIcons name="information" size={24} color={Colors.light.tabIconDefault} />
                    <Text style={styles.itemText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <MaterialCommunityIcons name="help-circle" size={24} color={Colors.light.tabIconDefault} />
                    <Text style={styles.itemText}>Help</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 100,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.tabIconDefault,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.tabIconDefault,
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    itemText: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
});

export default SettingsScreen;
