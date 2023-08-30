import { React, useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoadingScreen from './src/screens/LoadingScreen';
import 'expo-dev-client';



export default function App() {

  return (
    <>
      <Provider store={store}>
        <LoadingScreen />
      </Provider>
    </>
  );
}