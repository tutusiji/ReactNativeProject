import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SimpleApp() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello React Native!</Text>
            <Text style={styles.text}>App is working correctly.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginVertical: 10,
    },
});
