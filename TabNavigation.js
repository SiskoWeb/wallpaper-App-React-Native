import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import WallDetails from "./src/screens/WallDetails";
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, FONTS, DATA } from './constants/'



const Tab = createBottomTabNavigator()
function TabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home';
                    } else if (route.name === 'Favourite') {
                        iconName = focused ? 'ios-star' : 'ios-star';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.second,
                tabBarInactiveTintColor: '#c3c8d7',
                tabBarStyle: {
                    paddingVertical: 5, backgroundColor: COLORS.cardBg,
                    shadowColor: 'black', position: 'absolute', height: 60, borderTopColor: COLORS.cardBg
                },
                tabBarLabelStyle: { paddingBottom: 3, display: 'none' },
                headerShown: false
            })}

        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favourite" component={WallDetails} />
        </Tab.Navigator>
    )
}

export default TabNavigator;
