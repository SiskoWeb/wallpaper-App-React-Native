import { View, Text, ToastAndroid, StyleSheet, SafeAreaView, PermissionsAndroid } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { COLORS, SIZES, FONTS, DATA } from '../../constants/'

import { ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";
import Button from '../components/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
// import WallPaperManager from '@ajaybhatia/react-native-wallpaper-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteFromFavourite, setFavourite } from '../../redux/wallpaperSlice'
import { useDispatch, useSelector } from 'react-redux'


const WallDetails = ({ navigation }) => {



    const dispatch = useDispatch()
    const FavouriteData = useSelector((state) => state.wallpaper.Favourite);

    {/* get data passed from route  */ }
    const route = useRoute();
    const item = route.params.item;

    // check if this wallpaper already in favourte
    const [isExist, setIsExist] = useState(FavouriteData.some(obj =>
        obj.id === item.id
    ));





    // add wallpaper to favorate page
    const setToFavorte = async () => {

        //if wall not exist in favoute add it using redux
        if (!isExist) {
            dispatch(setFavourite(item))
            setIsExist(true)
            ToastAndroid.showWithGravity(
                'added',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
        //if wall  exist in favoute remove it using redux
        else {
            dispatch(deleteFromFavourite(item))
            setIsExist(false)
            ToastAndroid.showWithGravity(
                'removed',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

    }


    const setWallpaperfun = () => {
        // ManageWallpaper.setWallpaper(
        //     {
        //         uri: 'https://i.pinimg.com/originals/76/5e/1d/765e1dc8cb1cc115fb3b0b39a895fdeb.jpg',
        //     },
        //     callback,
        //     TYPE.HOME,
        // );
    };


    const checkPermission = async () => {
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission
        if (Platform.OS === 'ios') {
            downloadImage();
        } else {
            try {

                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage();
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            }
            catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };


    const clearData = () => {
        AsyncStorage.clear();
    }




    return (
        <SafeAreaView style={styles.container}  >

            <ImageBackground source={item.image} resizeMode="cover" style={styles.image}>

                {/*  Button Back*/}
                <View style={{ paddingTop: wp("5%"), paddingLeft: wp("2%") }}>
                    <Button
                        pressHandler={() => navigation.goBack()}
                        stylesButton={styles.btnBack}
                        Icon={<Ionicons name='arrow-undo-outline' size={30} color={COLORS.white} />}
                    />
                </View>


                {/*  Button download*/}
                <View style={styles.btnsContainer}>
                    <Button
                        pressHandler={clearData}
                        stylesButton={styles.btnDownload}
                        Icon={<Ionicons name='ios-chevron-down' size={40} color={COLORS.white} />}
                    />

                    {/*  Button set wallpaper*/}
                    <Button
                        pressHandler={setWallpaperfun}
                        stylesText={styles.stylesText}
                        title='SET AS'
                        stylesButton={styles.btnSetAs}
                    />


                    {/*  Button add to favorte*/}
                    <Button
                        pressHandler={setToFavorte}
                        stylesButton={styles.btnFavort}
                        Icon={<Ionicons name='ios-heart' size={40} color={isExist ? 'red' : 'grey'} />}
                    />
                </View>
            </ImageBackground>

        </SafeAreaView>
    )
}

export default WallDetails


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingTop: StatusBar.currentHeight,

    }, image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: SIZES.xLarge,
        gap: SIZES.medium
    },
    stylesText: {
        color: 'white',
        fontSize: SIZES.large,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    btnSetAs: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: SIZES.xLarge + 30,
        backgroundColor: COLORS.second,
        textAlign: 'center',
        borderRadius: 50,


    },
    btnDownload: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.xLarge + 30,
        height: SIZES.xLarge + 30,
        backgroundColor: COLORS.cardBg,
        borderRadius: 50
    },
    btnFavort: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.xLarge + 30,
        height: SIZES.xLarge + 30,
        backgroundColor: COLORS.white,
        borderRadius: 50
    },
    btnBack: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.xLarge + 20,
        height: SIZES.xLarge + 20,
        backgroundColor: COLORS.cardBg,
        borderRadius: 50
    },

})
