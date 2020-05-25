import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Component} from 'react';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import TabBarIcon from '../components/TabBarIcon';
import LineCross from '../screens/LineCross';
import { db,app } from '../App0.js';
import firebase from 'firebase/app';
import 'firebase/firestore';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class NavigationHistory extends Component  {
  state = {
      count: 1,
      securityName: [],
      securityDate: [],
      securityTime: [],
      docs: [{docID:""}]
  };
watchVideo(){
  this.props.navigation.navigate('Cross')

}
getDocs(sec){
  const secArr = []
  const names = []

  const secLine = sec.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = doc.id
            const name = doc.data().name
            names.push(name)

            secArr.push({docID:data,name:name})
          })
          console.log("sec", secArr)
        })
        .catch(error => console.log(error))
  return secArr;
}

getAll(sec){
  const crossD = []
  const crossT = []
  var date = ""
  var time = ""

  for(var i = 0; i < this.state.docs.length; i++){

    const name = this.state.docs[i].name

    const secLine = sec.doc(this.state.docs[i].docID).collection('crossed').get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              date = doc.data().crossDate
              time = doc.data().crossTime
              crossD.push({name: name,date:date,time:time})
            })


          })
          .catch(error => console.log(error))


          }
    return crossD

}
  async componentDidMount(){

    var user = firebase.auth().currentUser;
    console.log(user.uid)
    const sec = db.collection('users').doc(user.uid).collection('cameras').doc(global.cameraID).collection('SecurityLines')
    let secArr = await this.getDocs(sec);
    await this.setState({docs: await secArr})
    console.log("didsec", secArr)
    await sleep(2000)
    let crossD = await this.getAll(sec);

    console.log("didcross", crossD)
    await sleep(2000)
    await this.setState({securityDate: await crossD})
    console.log("global",global.SampleVar)
  }


render(){
  console.log("render")

  let deneme = this.state.securityDate



  return(
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


    <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{flex:1.4}}>Crossed Line</DataTable.Title>
              <DataTable.Title numeric>Date</DataTable.Title>
              <DataTable.Title numeric>Time</DataTable.Title>
              <DataTable.Title numeric>Watch </DataTable.Title>
            </DataTable.Header>

            { deneme.map((id)=>(
            <DataTable.Row>
              <DataTable.Cell  style={{flex:1.4,width:200,height: 100}} >  {id.name}
              </DataTable.Cell>
              <DataTable.Cell numeric >{id.date}</DataTable.Cell>
              <DataTable.Cell numeric>{id.time}</DataTable.Cell>
              <DataTable.Cell numeric onPress={() => this.watchVideo()} ><TabBarIcon  name="md-camera"  /></DataTable.Cell>
            </DataTable.Row>))}

          </DataTable>
    </ScrollView>);
 }
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
  input: {
    width:200,
    borderBottomColor:'red',
    borderBottomWidth:1,
  },
  option: {
    backgroundColor: '#fdfdfd',
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
export default NavigationHistory;
