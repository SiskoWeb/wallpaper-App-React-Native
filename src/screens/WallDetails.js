import { View, Text, ToastAndroid, StyleSheet, SafeAreaView, PermissionsAndroid, CameraRoll } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { COLORS, SIZES, FONTS, DATA } from '../../constants/'
import * as FileSystem from 'expo-file-system';
import { ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";
import Button from '../components/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { deleteFromFavourite, setFavourite } from '../../redux/wallpaperSlice'
import { useDispatch, useSelector } from 'react-redux'
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WallDetails = ({ navigation }) => {




    const dispatch = useDispatch()
    const FavouriteData = useSelector((state) => state.wallpaper.Favourite);

    const [loading, setLoading] = useState(false);
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



    const downloadFromUrl = async () => {
        setLoading(true)

        const filename = `wallpaper${Math.random()}.jpg`;
        const result = await FileSystem.downloadAsync(
            item.image,
            FileSystem.documentDirectory + filename,

        );
    

        await save(result.uri, filename, "Content-Type:image/*");
        setLoading(false)
    };





    const save = async (uri, filename, mimetype) => {
        if (Platform.OS === "android") {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (permissions.granted) {


                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                    .then(async (uri) => {

                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });

                        ToastAndroid.showWithGravity(
                            'Downloaded',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    })
                    .catch(e => {

                        console.log(e)
                        ToastAndroid.showWithGravity(
                            'pb',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    })

            } else {
                shareAsync(uri);
            }
        } else {
            shareAsync(uri);
        }

    };



    return (
        <SafeAreaView style={styles.container}  >

            {loading ? (
                <View className='z-50 flex-1 justify-center items-center bg-slate-500 opacity-70 w-full h-full absolute'>
                    <ActivityIndicator
                        size="large"

                        color="blue"
                    />
                    <Text>Loading...</Text>
                </View>
            ) : null}

            <ImageBackground source={{ uri: item.image, isStatic: true }} resizeMode="cover" style={styles.image}>

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
                    {/*   
                    <Button
                        pressHandler={downloadFromUrl}
                        stylesButton={styles.btnDownload}
                        Icon={<Ionicons name='ios-chevron-down' size={40} color={COLORS.white} />}
                    />*/}



                    {/*  Button set wallpaper*/}
                    <Button
                        pressHandler={downloadFromUrl}
                        stylesText={styles.stylesText}
                        title='DOWNLOAD'
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

        </SafeAreaView >
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
