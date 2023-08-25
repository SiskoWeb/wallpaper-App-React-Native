import { StatusBar } from "expo-status-bar";
import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigation";
import WallDetails from "./src/screens/WallDetails";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const Stack = createNativeStackNavigator();



const Routes = () => {
    const [fontLoaded] = useFonts({
        InterBold: require("./assets/fonts/Inter-Bold.ttf"),
        InterLight: require("./assets/fonts/Inter-Light.ttf"),
        InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
        InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
        InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    });
    if (!fontLoaded) return null;

    return (
        <>

            <StatusBar style="light" animated={true} />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Tab"
                        component={TabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="Display"
                        component={WallDetails} />
                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}

export default Routes;





