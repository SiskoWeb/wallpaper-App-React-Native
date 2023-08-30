import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getWallpapers, setFavourite, setWallpapers } from '../../redux/wallpaperSlice';
import { COLORS } from '../../constants'
import RootNavigation from "../../Routes";
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import { API_URL } from "@env"


export default function LoadingScreen() {

    const [loading, setLoading] = useState(true)
    const [errorData, setErrorData] = useState(false)
    const dispatch = useDispatch()

    const netInfo = useNetInfo(); // checker if internet exist





    //fetch data fronm json file 
    const fetchWallpapers = async () => {

        try {
            const response = await axios.get(API_URL)

            //after fetch data send it to redux
            dispatch(setWallpapers(response.data))
            setLoading(false)


        } catch (error) {
            console.log(error)
            setErrorData(true)
            setLoading(false)
        }

    }




    // fet data
    useEffect(() => {
        /// check if internet exist if yes contune to fetch data 
        fetchWallpapers()

    }, [])







    // if there is error on fecth data display this
    if (errorData) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white' }} >Opps... ! </Text>
                <Text style={{ color: 'white' }}> there is a problem re open app agin or Connect Internet</Text>

            </View>
        )
    }



    // componenet display when there is no internet
    const NoInternetError = () => {
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white' }}>Opps... ! </Text>
                <Text style={{ color: 'white' }}>You need Connect Internet First</Text>
            </View>
        );
    };


    return (
        <>
            {netInfo.isConnected ? /// check if internet exist if yes contune to fetch data (true || false)
                loading ?
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.bg,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator
                            size="large"
                            color={COLORS.second}
                        />
                        <Text style={{ color: 'white' }}>Loading Data...</Text>
                    </View>
                    :
                    <RootNavigation /> :
                <NoInternetError />
            }
        </>
    )
}