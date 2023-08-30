import { View, Text, ToastAndroid, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, } from 'react'
import { COLORS, SIZES } from '../../constants'
import * as FileSystem from 'expo-file-system';
import { ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";
import Button from '../components/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { deleteFromFavourite, setFavourite } from '../../redux/wallpaperSlice'
import { useDispatch, useSelector } from 'react-redux'
import { shareAsync } from 'expo-sharing';
import { ActivityIndicator } from 'react-native';
import interstitialAd from '../../hooks/useInterstitialAds';
import rewardedAdsAds from '../../hooks/useRewardedAds';



const WallDetails = ({ navigation }) => {
    const { isLoadedInterstitialAd, isClosedInterstitialAd, loadInterstitialAd, showInterstitialAd } = interstitialAd()
    const { isLoadedRewardedAds, isEarnedReward, isClosedRewardedAds, loadRewardedAds, showRewardedAds, reward } = rewardedAdsAds()

    const dispatch = useDispatch()
    const FavouriteData = useSelector((state) => state.wallpaper.Favourite);
    const [loadingScreen, setLoadingScreen] = useState(false);
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
    useEffect(() => {


        if (isEarnedReward) {
            item.premium = true
        }
    }, [isEarnedReward]);


    const unlockDownloadBtn = () => {
        if (isLoadedRewardedAds) {
            showRewardedAds()
        }
        else {
            ToastAndroid.showWithGravity(
                'RewardedAds is not load yet try again',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

    }

    console.log(isEarnedReward)
    console.log('hola')
    console.log(reward)
    const downloadFromUrl = async () => {


        setLoadingScreen(true)
        const filename = `wallpaper${Math.random()}.jpg`;
        const result = await FileSystem.downloadAsync(
            item.url,
            FileSystem.documentDirectory + filename,

        );
        ToastAndroid.showWithGravity(
            'ads Appear After Download',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        await save(result.uri, filename, "Content-Type:image/*");
        setLoadingScreen(false)
    };




    // save image to divice
    const save = async (uri, filename, mimetype) => {
        if (Platform.OS === "android") {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                    .then(async (uri) => {

                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });

                        ToastAndroid.showWithGravity(
                            'ads appear now',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                        if (isLoadedInterstitialAd) {
                            showInterstitialAd()
                        } else {

                            ToastAndroid.showWithGravity(
                                'There is pb in ads',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                            );
                        }


                    })
                    .catch(e => {

                        console.log(e)
                        ToastAndroid.showWithGravity(
                            'Problem',
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

            {loadingScreen ?
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.bg,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    height: "100%",
                    width: "100%",
                    zIndex: 2,
                    opacity: 0.5
                }}>
                    <ActivityIndicator
                        size="large"

                        color={COLORS.second}
                    />
                    <Text style={{ color: 'white' }}>Loading Data...</Text>
                </View>
                : null}

            <ImageBackground source={{ uri: item.url, isStatic: true }} resizeMode="cover" style={styles.image}>

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

                    {/*  Button set wallpaper*/}

                    {item.premium ?

                        <Button
                            pressHandler={unlockDownloadBtn}
                            title='watch ads'
                            stylesButton={styles.btnSetAs}
                        />

                        : <Button
                            pressHandler={downloadFromUrl}
                            stylesText={styles.stylesText}
                            title='DOWNLOAD'
                            stylesButton={styles.btnSetAs}
                        />}

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
