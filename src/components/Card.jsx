import { View, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
// import { Image } from 'expo-image';
const ImageCard = ({ item }) => {

    const [loading, setLoading] = useState(true);
    const { width, height } = Dimensions.get("window");
    const navigation = useNavigation();

    const imageDetails = () => {
        navigation.navigate("Display", { item });
    };




    return (
        <TouchableWithoutFeedback>
            <View
                style={{
                    borderColor: "white",
                    borderRadius: 5,
                    paddingBottom: 2,
                    opacity: 1,
                    marginHorizontal: 8,
                    marginVertical: 8,
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        style={{ position: "absolute", zIndex: 2, left: 55 }}
                        color="pink"
                    />
                ) : null}

                <TouchableOpacity onPress={() => imageDetails()}>
                    <Image
                        source={item.image}

                        style={{
                            width: width / 2 - 20,
                            height: height / 2 - 50,
                            opacity: 0.85,
                            justifyContent: "center",
                            borderRadius: 5,
                        }}
                        onLoadStart={(e) => {
                            setLoading(true);
                        }}
                        onLoadEnd={(e) => {
                            setLoading(false);
                        }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ImageCard;
