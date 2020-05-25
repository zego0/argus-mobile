import * as React from 'react';
import {Component} from 'react';
import { StyleSheet, Text, View, Table } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import HomeScreen from '../screens/HomeScreen';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { db,app } from '../App0.js';
import firebase from 'firebase';
import 'firebase/firestore';



class LinksScreen extends Component{
  state = {
      count: 1,
      elements: []
  };

handleClick(index) {
 let newCams = this.state.elements
 for(var i = 0; i < newCams.length; i++){
   newCams[i].color = false
 }
 newCams[index].color = true
 global.cameraID = newCams[index].camID;
 this.setState({elements: newCams})
 global.camLink = '<html><body><img src="' + newCams[index].camLink + '" width="100%" style=" min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>'
 console.log("global değiştin mi", global.cameraID)
 console.log("camlink", global.camLink)
 this.props.navigation.navigate('Stream')
}

componentDidMount(){
  var user = firebase.auth().currentUser;
  console.log(user.uid)
  var color = true
  var count = 0
  const cameras = db.collection('users').doc(user.uid).collection('cameras').get()
        .then(snapshot => {
          const cams = []
          snapshot.forEach(doc => {
            const data = doc.data()
            cams.push({camID:doc.id, camLink:data.camLink, name:data.name, color:color, index: count})
            color = false
            count = count + 1
          })
          this.setState({elements: cams})
        })  .catch(err => {
            console.log('Error getting documents', err);

          });


  }


render(){
console.log(this.state.elements)
  return (
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

           { this.state.elements.map((item)=>(
             <OptionButton label={item.name} color={item.color} icon="md-camera" onPress={() => this.handleClick(item.index)} ></OptionButton>)
           )}

  </ScrollView>);
  }
}

function OptionButton({ icon, label, onPress, isLastOption, color }) {
  console.log("color", color)
  return (
    <RectButton  style={ color ? styles.option2: styles.option1}
   onPress={onPress}>
      <View  style={{ flexDirection: 'row'}} >
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22}  />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option1: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  option2: {
    backgroundColor: '#c4dcff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,

  },
});

export default LinksScreen;
