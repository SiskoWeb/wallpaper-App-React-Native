import { View, Text, Pressable } from 'react-native'
import React from 'react'

const Button = ({ pressHandler, Icon, stylesText, title, stylesButton }) => {


    const RenderContentIconOrText = () => {

        if (!Icon) {
            return <Text style={stylesText}>{title && title}</Text>;
        } else {
            return Icon;
        }
    }
    return (
        <Pressable style={stylesButton} onPress={pressHandler}>
            <RenderContentIconOrText />
        </Pressable>
    )
}

export default Button