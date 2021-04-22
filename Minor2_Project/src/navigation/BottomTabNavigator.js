import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

// screens
import InformationScreen from '../screens/Main/InformationScreen';
import MapSceen from '../screens/Main/MapScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import MessageScreen from '../screens/Main/MessageScreen';

//theme
import MyTheme from '../constants/Theme';
import Colors from '../constants/Colors';
import Profile from '../screens/Main/ProfileScreen';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import SignIn from '../screens/Main/SignIn';
import SignUp from '../screens/Main/SignUp';
//import AddPost from '../screens/Main/AddPostScreen';
import AddPostScreen from '../screens/Main/AddPostScreen';

//constants
const BottomTab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const InfoStack = createStackNavigator();
const MapStack = createStackNavigator();
const MessageStack = createStackNavigator();
const AddPostStack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Home';
const tabHeight = 56;

const MyTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (index === 0) {
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                // onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: tabHeight,
                  backgroundColor: MyTheme.colors.backgroundWhite,
                }}>
                <View>
                  <View
                    style={{justiftyContent: 'center', alignItems: 'center'}}>
                    <TabBarIcon
                      name="home"
                      type="material"
                      focused={isFocused}
                    />
                  </View>
                  {/* <Text
                    style={{
                      color: isFocused
                        ? Colors.tabIconSelected
                        : Colors.tabIconDefault,
                      fontWeight: 'bold',
                    }}>
                    {label}
                  </Text> */}
                </View>
              </TouchableOpacity>
            );
          }

          if (index === 1) {
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                // onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: tabHeight,
                  backgroundColor: MyTheme.colors.backgroundWhite,
                }}>
                <View style={{justiftyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{justiftyContent: 'center', alignItems: 'center'}}>
                    <TabBarIcon
                      name="info"
                      type="iconicon"
                      focused={isFocused}
                    />
                  </View>
                  {/* <Text
                    style={{
                      color: isFocused
                        ? Colors.tabIconSelected
                        : Colors.tabIconDefault,
                      fontWeight: 'bold',
                    }}>
                    {label}
                  </Text> */}
                </View>
              </TouchableOpacity>
            );
          }

          if (index === 2) {
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                // onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: tabHeight,
                  backgroundColor: MyTheme.colors.backgroundWhite,
                }}>
                <View style={{justiftyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{justiftyContent: 'center', alignItems: 'center'}}>
                    <TabBarIcon
                      name="room"
                      type="material"
                      focused={isFocused}
                    />
                  </View>
                  {/* <Text
                    style={{
                      color: isFocused
                        ? Colors.tabIconSelected
                        : Colors.tabIconDefault,
                      fontWeight: 'bold',
                    }}>
                    {label}
                  </Text> */}
                </View>
              </TouchableOpacity>
            );
          }

          if (index === 3) {
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                // onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: tabHeight,
                  backgroundColor: MyTheme.colors.backgroundWhite,
                }}>
                <View style={{justiftyContent: 'center', alignItems: 'center'}}>
                  <View>
                    <TabBarIcon
                      name="forum"
                      type="material"
                      focused={isFocused}
                    />
                  </View>
                  {/* <Text
                    style={{
                      color: isFocused
                        ? Colors.tabIconSelected
                        : Colors.tabIconDefault,
                      fontWeight: 'bold',
                    }}>
                    {label}
                  </Text> */}
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </>
  );
};

const BottomTabNavigator = () => {
  //   navigation.setOptions({headerTitle: getHeaderTitle(route)});

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBar={(props) => <MyTabBar {...props} />}>
      <BottomTab.Screen
        name="Home"
        component={AddPostStackScreen}
        // options={{
        //   title: 'Community',
        //   tabBarIcon: ({focused}) => (
        //     <TabBarIcon focused={focused} name="md-code-working" />
        //   ),
        // }}
      />
      <BottomTab.Screen
        name="Info"
        component={InfoStackScreen}
        // options={{
        //   title: 'Information',
        //   tabBarIcon: ({focused}) => (
        //     <TabBarIcon focused={focused} name="md-book" />
        //   ),
        // }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapStackScreen}
        //component={AddPostScreen}
        // options={{
        //   title: 'Nearby',
        //   tabBarIcon: ({focused}) => (
        //     <TabBarIcon focused={focused} name="md-book" />
        //   ),
        // }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessageStackScreen}
        // options={{
        //   title: 'Messages',
        //   tabBarIcon: ({focused}) => (
        //     <TabBarIcon focused={focused} name="md-book" />
        //   ),
        // }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const MessageStackScreen = ({navigation}) => (
  <MessageStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.backgroundWhite,
        height: responsiveHeight(7),
      },
      headerTintColor: Colors.tabIconDefault,
      headerTitleStyle: {
        marginLeft: -25,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: responsiveFontSize(3),
      },
    }}>
    <MessageStack.Screen
      name="Messages"
      component={MessageScreen}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
            onPress={() => navigation.openDrawer()}>
            <TabBarIcon
              name="bars"
              size={15}
              color={Colors.backgroundWhite}
              type="font-awesome-5"
            />
          </TouchableOpacity>
        ),
      }}
    />
  </MessageStack.Navigator>
);
const MapStackScreen = ({navigation}) => (
  <MapStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.backgroundWhite,
        height: responsiveHeight(7),
      },
      headerTintColor: Colors.tabIconDefault,
      headerTitleStyle: {
        marginLeft: -25,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: responsiveFontSize(3),
      },
    }}>
    <MapStack.Screen
      name="Nearby"
      component={MapSceen}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
            onPress={() => navigation.openDrawer()}>
            <TabBarIcon
              name="bars"
              size={15}
              color={Colors.backgroundWhite}
              type="font-awesome-5"
            />
          </TouchableOpacity>
        ),
      }}
    />
  </MapStack.Navigator>
);

const AddPostStackScreen = ({navigation}) => (
  <AddPostStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AddPostStack.Screen name="Main" component={HomeStackScreen} />
  </AddPostStack.Navigator>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.backgroundWhite,
        height: responsiveHeight(7),
      },
      headerTintColor: Colors.tabIconDefault,
      headerTitleStyle: {
        marginLeft: -25,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: responsiveFontSize(3),
      },
    }}>
    <HomeStack.Screen
      name="Community"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
            onPress={() => navigation.openDrawer()}>
            <TabBarIcon
              name="bars"
              size={15}
              color={Colors.backgroundWhite}
              type="font-awesome-5"
            />
          </TouchableOpacity>
        ),
      }}
    />
    <HomeStack.Screen
      name="Add Post"
      component={AddPostScreen}
      // options={{
      //   headerLeft: () => (
      //     <TouchableOpacity
      //       style={{
      //         marginLeft: 10,
      //       }}
      //       onPress={() => navigation.openDrawer()}>
      //       <TabBarIcon
      //         name="bars"
      //         size={15}
      //         color={Colors.backgroundWhite}
      //         type="font-awesome-5"
      //       />
      //     </TouchableOpacity>
      //   ),
      // }}
    />
  </HomeStack.Navigator>
);

const InfoStackScreen = ({navigation}) => (
  <InfoStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.backgroundWhite,
        height: responsiveHeight(7),
      },
      headerTintColor: Colors.tabIconDefault,
      headerTitleStyle: {
        marginLeft: -25,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: responsiveFontSize(3),
      },
    }}>
    <InfoStack.Screen
      name="Information"
      component={InformationScreen}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
            onPress={() => navigation.openDrawer()}>
            <TabBarIcon
              name="bars"
              size={15}
              color={Colors.backgroundWhite}
              type="font-awesome-5"
            />
          </TouchableOpacity>
        ),
      }}
    />
  </InfoStack.Navigator>
);
