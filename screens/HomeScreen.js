import * as React from 'react';
import {Component} from 'react';
import { WebView } from 'react-native-webview'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import {NavigationContainer} from '@react-navigation/native';

import { db,app } from '../App0.js';
import firebase from 'firebase';
import { NavigationEvents } from "react-navigation";


function sleep(ms)
 {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var styles2 = StyleSheet.create({
  backgroundVideo: {
    width:400,
    height:322
  }
})
import { MonoText } from '../components/StyledText';
global.cameraID = '';
class HomeScreen extends Component {

  state = {
      url: '<html><body><img src=' + global.camLink +' width="100%" style=" min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>',
      width: 300,
      height: 300
  };
 deneme(){
   var user = firebase.auth().currentUser;
   console.log(user.uid)
   var count = 0
   const cameras = db.collection('users').doc(user.uid).collection('cameras').get()
         .then(snapshot => {
           snapshot.forEach(doc => {
             if (count == 0){
               global.cameraID = doc.id;
               global.camLink = doc.data().camLink;
               sleep(2000)
               global.camLink = '<html><body><img src=' + global.camLink + ' width="100%" style=" min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>'

               console.log("camLink", global.camLink)
               console.log("foreach", global.cameraID)
             }
             count = count + 1
           })

         })  .catch(err => {
             console.log('Error getting documents', err);

           });


 }

async componentDidMount(){

        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>
          this.deneme()
        );
        sleep(1000)
        await this.setState({url: global.camLink})
  }

  render(){

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.getStartedContainer}>

          <WebView
            originWhitelist={['*']}
            source={{ html: this.state.url }}
            style={{ width: 450, height:600 }}
          />


        </View>

      </ScrollView>

    </View>
  );
}
}

HomeScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 5,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
export default HomeScreen
