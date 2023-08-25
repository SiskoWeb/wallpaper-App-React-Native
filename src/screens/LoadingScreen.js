import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native'

import { useDispatch } from 'react-redux';
import { setWallpapers } from '../../redux/wallpaperSlice';
import { DATA } from '../../constants/'
import RootNavigation from "../../Routes";



export default function LoadingScreen() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()


    // fet data
    useEffect(() => {
        setTimeout(() => {
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