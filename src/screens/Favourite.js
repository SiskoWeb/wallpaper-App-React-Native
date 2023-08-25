import { View, Text, StatusBar, StyleSheet, SafeAreaView, RefreshControl, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, FONTS, DATA } from '../../constants/'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageCard from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';


const Favourite = () => {

  const FavouriteData = useSelector((state) => state.wallpaper.Favourite);

  const [wFavourite, setWDFavourite] = useState(FavouriteData); // Initialize with the complete data
  const [refreshing, setRefreshing] = useState(false);




  const onRefresh = () => {
    setRefreshing(true);
    setWDFavourite(FavouriteData); // Refresh visible data
    setRefreshing(false);
  };





  useEffect(() => {
    setWDFavourite(FavouriteData)
  }, [FavouriteData])

  const btns = () => {

    setWDFavourite(FavouriteData);
    alert('loading')
  }
  const NotFoundNFT = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Opps... ! </Text>
        <Text style={styles.notFoundText}> No Favourite Wallpaper</Text>
        <Button
          pressHandler={btns}

          title='SET AS'

        />
      </View>
    );
  };



  return (

    <SafeAreaView style={{
      paddingVertical: StatusBar.currentHeight + 5,
      width: wp("100%"), height: hp("100%"),
      backgroundColor: COLORS.bg,
    }}>





      <View style={{
        height: hp("100%"),
        width: wp("100%"),
        marginBottom: hp("2%"),
        flex: 1,
        gap: 10
      }}>

        {!wFavourite?.length ? <NotFoundNFT /> : <FlatList
          data={wFavourite}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{ alignSelf: "stretch" }}
          contentContainerStyle={{
            flexDirection: "column",
            maxWidth: "100%",
            justifyContent: "space-between",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => {
            return <ImageCard key={index} item={item} />;
          }}
        />}
      </View>




    </SafeAreaView>
  );
}

export default Favourite


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

