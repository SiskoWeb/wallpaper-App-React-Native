import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { COLORS, FONTS, SIZES } from '../../constants/index';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
const HomeHeader = ({ searchHandler }) => {
    return (




        <View style={styles.inputSearch}>
            <MaterialIcons name="search" size={hp('3%')} color={COLORS.white} />
            <TextInput
                placeholderTextColor={COLORS.white}
                style={{ flex: 1, color: COLORS.white }}
                placeholder='Searching'
                onChangeText={(value) => searchHandler(value)} />

        </View>


    )
}

export default HomeHeader

const styles = StyleSheet.create({

    inputSearch: {
        backgroundColor: COLORS.cardBg,
        flexDirection: 'row',
        padding: hp('1.5%'),
        borderRadius: hp('5%'),
        gap: 16,

    }

})