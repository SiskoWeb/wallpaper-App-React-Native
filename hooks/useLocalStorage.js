import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

function useLocalStorage({ name, items }) {

    const setData = async () => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('my-key', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const showData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            // error reading value
        }
    };

    const clearData = () => {
        AsyncStorage.clear();
    }

    return { setData, showData, clearData }
}

export default useLocalStorage