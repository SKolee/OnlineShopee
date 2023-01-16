import React from 'react';

//Navigators
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Screens
import HomeScreen from './src/screens/HomeScreen';
import HomeScreenDetails from './src/screens/HomeScreenDetails';
import AccountScreen from './src/screens/AccountScreen';
import WishListScreen from './src/screens/WishListScreen';
import BagScreen from './src/screens/BagScreen';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Redux
import {Provider} from 'react-redux';
import store from './src/redux/store/store';

const Tab = createBottomTabNavigator();

const HomeStack=createStackNavigator()

const HomeStackScreen=()=>  (
  <HomeStack.Navigator>
    <HomeStack.Screen  options={{headerShown: false}} name='HomeScreen' component={HomeScreen}/>
    <HomeStack.Screen name='HomeScreenDetails' component={HomeScreenDetails}/>
  </HomeStack.Navigator>
)

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Account') {
                iconName = focused ? 'account' : 'account-outline';
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={35}
                    color={color}
                    style={{paddingTop: 7}}
                  />
                );
              } else if (route.name === 'WishList') {
                iconName = focused ? 'ios-heart' : 'ios-heart-outline';
              } else if (route.name === 'Bag') {
                iconName = focused ? 'md-cart' : 'md-cart-outline';
              }
              return (
                <Ionicons
                  name={iconName}
                  size={30}
                  color={color}
                  style={{paddingTop: 8}}
                />
              );
            },
            tabBarLabel: ' ',
          })}
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            style: {
              height: 52,
              backgroundColor: '#20272D',
            },
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
          <Tab.Screen name="WishList" component={WishListScreen} />
          <Tab.Screen name="Bag" component={BagScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
