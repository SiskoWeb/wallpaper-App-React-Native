import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

function useLocalStorage({ name, items }) {

    const setData = () => {
        // AsyncStorage.setItem("name", "S.G.");
        // AsyncStorage.setItem("age", JSON.stringify(24))
        AsyncStorage.setItem(name, JSON.stringify(items));
    };

    const showData = async () => {
        let data = await AsyncStorage.getItem(name);
        data = JSON.parse(data);
        return data


    };

    const clearData = () => {
        AsyncStorage.clear();
    }

    return { setData, showData, clearData }
}

export default useLocalStorage