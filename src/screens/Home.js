import { View, Text, StatusBar, StyleSheet, SafeAreaView, RefreshControl, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'

import { COLORS, SIZES, FONTS, DATA } from '../../constants/'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeHeader from '../components/HomeHeader';
import { FlashList } from '@shopify/flash-list';
import Card from '../components/Card';
import ImageCard from '../components/Card';
import Albums from '../../hooks/useScrollToTop'
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {


    const { wallpapers } = useSelector((state) => state.wallpaper);
    const [wData, setWData] = useState(wallpapers); // Initialize with the complete data
    const [refreshing, setRefreshing] = useState(false);
    const [visibleData, setVisibleData] = useState(wData.slice(0, initialLoadCount));
    const itemsPerPage = 10; // Number of items per "page"
    const initialLoadCount = 20; // Initial number of items to load

    const loadMoreData = () => {
        const startIndex = visibleData.length;
        const endIndex = startIndex + itemsPerPage;

        if (endIndex <= wData.length) {
            setVisibleData([...visibleData, ...wData.slice(startIndex, endIndex)]);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setVisibleData(wData.slice(0, initialLoadCount)); // Refresh visible data
        setRefreshing(false);
    };

    const searchHandler = (value) => {
        if (value) {
            const filteredData = DATA.filter((nft) =>
                nft.name.toLowerCase().includes(value.toLowerCase())
            );
            setWData(filteredData);
            setVisibleData(filteredData.slice(0, initialLoadCount)); // Update visible data when filtering
        } else {
            setWData(DATA);
            setVisibleData(DATA.slice(0, initialLoadCount)); // Update visible data when clearing search
        }
    };

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
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "stretch" }}
                    contentContainerStyle={{
                        flexDirection: "column",
                        maxWidth: "100%",
                        justifyContent: "space-between",
                    }}
                    initialNumToRender={5}
                    onEndReached={loadMoreData}
                    renderItem={({ item, index }) => {
                        return <ImageCard key={index} item={item} />;
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />}
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



// <View style={{
//     height: hp("100%"),
//     width: wp("100%"),
//     marginBottom: hp("2%"),
//     flex: 1,
//     gap: 10
// }}>
//     {!visibleData.length ? <NotFoundNFT /> :
//         <FlashList
//             data={visibleData}
//             renderItem={({ item }) => <ImageCard item={item} />}
//             keyExtractor={item => item.id}
//             refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//             }
//             columnWrapperStyle={{ justifyContent: 'space-between' }}
//             numColumns={2}
//             estimatedItemSize={200}
//             ListFooterComponent={renderFooter}
//             onEndReached={loadMoreData}
//             onEndReachedThreshold={0.1}
//         />}
// </View>




// <View style={styles.container}>
// <FlatList
//     data={visibleData}
//     keyExtractor={(item) => item.id}
//     numColumns={2}
//     showsVerticalScrollIndicator={false}
//     style={{ alignSelf: "stretch" }}
//     contentContainerStyle={{
//         flexDirection: "column",
//         maxWidth: "100%",
//         justifyContent: "space-between",
//     }}
//     initialNumToRender={5}
//     onEndReached={loadMoreData}
//     renderItem={({ item, index }) => {
//         return <ImageCard key={index} item={item} />;
//     }}
// />
// </View>