import { React, useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import RootNavigation from "./Routes";
import { useDispatch } from 'react-redux';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoadingScreen from './src/screens/LoadingScreen';




export default function App() {

  return (
    <>
      <Provider store={store}>
        <LoadingScreen />
      </Provider>
    </>
  );
}