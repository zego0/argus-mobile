import * as React from 'react';
import {Component} from 'react';
import { StyleSheet, Text, View, Table } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import HomeScreen from '../screens/HomeScreen';
import { db,app } from '../App0.js';
import firebase from 'firebase';
import 'firebase/firestore';
import { Video } from 'expo-av';

function sleep(ms)
 {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var url2 = "https://firebasestorage.googleapis.com/v0/b/argus-vision.appspot.com/o/25052020_0414_bayraktarmustafa%40outlookcom?alt=media&token=5d067103-bc59-46ea-908b-e9bb0d5645b4"

class LineCross extends Component{
  state ={
    url : ""
  }
  async componentDidMount(){
    const ref = firebase.storage().ref().child('25052020_0414_bayraktarmustafa@outlookcom');
    const url = await ref.getDownloadURL();
    await sleep(1000)
    console.log("url", url)

    this.setState({url: url})
  }

render(){

  return (
    <View style={styles.container}>
    <Video
        source={{ uri: this.state.url }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
      />
       </View>
     );
     }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default LineCross;
