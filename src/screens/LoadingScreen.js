import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setFavourite, setWallpapers } from '../../redux/wallpaperSlice';
import { DATA } from '../../constants/'
import RootNavigation from "../../Routes";



export default function LoadingScreen() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        const r = await JSON.parse(result)
        if (result !== null) dispatch(JSON.parse(r));
        console.log(result)

    };

    const writeItemToStorage = async () => {
        await findNotes()
    };

    // fet data
    useEffect(() => {
        setTimeout(() => {
            // writeItemToStorage()
            dispatch(setWallpapers(DATA))
            setLoading(false)
        }, 200)
    }, [])



    return (
        <>

            {
                loading ?
                    <View style={{
                        flex: 1,
                        backgroundColor: '#000000',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text className='text-white'>Loading...</Text>
                    </View>
                    :
                    <RootNavigation />
            }

        </>
    );
}