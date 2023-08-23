import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

export default function Albums() {
    const ref = React.useRef(null);

    useScrollToTop(ref);

    return <View className='z-50 ' ref={ref}><Text className="text-white">back</Text></View>;
}