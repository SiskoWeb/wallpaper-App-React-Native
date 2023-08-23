import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import RootNavigation from "./Routes";




export default function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  return (
    <>
      {
        loading ?
          <View style={{
            flex: 1,
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text className='text-white'>Loading...</Text>
          </View>
          :
          <RootNavigation />
      }
    </>
  );
}