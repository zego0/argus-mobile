import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {decode as atob, encode as btoa} from 'base-64';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import NavigationHistory from './screens/NavigationHistory.js';
import CameraData from'./screens/CameraData.js';
import HomeScreen from './screens/HomeScreen';
import LineCross from './screens/LineCross';
import Login from './screens/Login.js'
import firebase from "firebase";
import { decode, encode } from 'base-64';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

export default function App(props) {


  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();

  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        //Load fonts
        await Expo.Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={Login} />
            <Stack.Screen name="Notification History" component={NavigationHistory} />
            <Stack.Screen name="Camera Data" component={CameraData} />
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Stream" component={HomeScreen} />
            <Stack.Screen name="Cross" component={LineCross} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
