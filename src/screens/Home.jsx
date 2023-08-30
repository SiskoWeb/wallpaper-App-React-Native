import { View, Text, StatusBar, StyleSheet, SafeAreaView, RefreshControl, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, FONTS } from '../../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeHeader from '../components/HomeHeader';
import ImageCard from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { AppOpenAd, AdEventType } from 'react-native-google-mobile-ads';
import { ToastAndroid } from 'react-native';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/6300978111';
const adUnitIdOpenAds = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitIdOpenAds, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const Home = () => {

    const { wallpapers } = useSelector((state) => state.wallpaper); // get wallpapers from redux

    const [refreshing, setRefreshing] = useState(false);
    const [visibleData, setVisibleData] = useState(wallpapers);
    const itemsPerPage = 5; // Number of items per "page"
    const initialLoadCount = 10; // Initial number of items to load






    // when user rech 10 wallpapers this function rander or display more wallpapers
    const loadMoreData = () => {
        const startIndex = visibleData.length;
        const endIndex = startIndex + itemsPerPage;
        if (endIndex <= wallpapers.length) {
            setVisibleData([...visibleData, ...wallpapers.slice(startIndex, endIndex)]);
        }
    };






    useEffect(() => {
        setVisibleData(wallpapers.slice(0, initialLoadCount))

        appOpenAd.load();

        ToastAndroid.showWithGravity(
            'ad appear soon',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        )
        setTimeout(() => {
            // appOpenAd.show();

        }, 2500)

    }, [])





    const onRefresh = () => {
        setRefreshing(true);
        setVisibleData(wallpapers.slice(0, initialLoadCount)); // Refresh visible data
        setRefreshing(false);
    };




    const searchHandler = (value) => {
        if (value) {
            const filteredData = wallpapers.filter((nft) =>
                nft.name.toLowerCase().includes(value.toLowerCase())
            );
            // setWData(filteredData);
            setVisibleData(filteredData.slice(0, initialLoadCount)); // Update visible data when filtering
        } else {
            // setWData(wallpapers);
            setVisibleData(wallpapers.slice(0, initialLoadCount)); // Update visible data when clearing search
        }
    };



    // componenet display when there is no wallpapers
    const NotFoundNFT = () => {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Opps... ! </Text>
                <Text style={styles.notFoundText}> Not found Wallpaper</Text>
            </View>
        );
    };



    return (
        <SafeAreaView style={{
            paddingVertical: StatusBar.currentHeight + 5,
            width: wp("100%"), height: hp("100%"),
            backgroundColor: COLORS.bg,
        }}>

            <View style={{ height: hp('8%'), }}>
                <HomeHeader searchHandler={searchHandler} />
            </View>




            <View style={{
                height: hp("100%"),
                width: wp("100%"),
                marginBottom: hp("2%"),
                flex: 1,
                gap: 10
            }}>

                {!visibleData.length ? <NotFoundNFT /> : <FlatList
                    data={visibleData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={true}
                    style={{ alignSelf: "stretch" }}
                    contentContainerStyle={{
                        flexDirection: "column",
                        maxWidth: "100%",
                        justifyContent: "space-between",
                    }}
                    onEndReached={loadMoreData}
                    renderItem={({ item, index }) => {
                        return <ImageCard key={index} item={item} />;
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />}

                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />

            </View>




        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    notFoundContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: SIZES.small,
    },
    notFoundText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: SIZES.xLarge,
    },
});


