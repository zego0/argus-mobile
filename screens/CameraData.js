import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button, Vibration} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Component} from 'react';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import TabBarIcon from '../components/TabBarIcon';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { db,app } from '../App0.js';
import firebase from 'firebase/app';
import 'firebase/firestore';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CameraData extends Component {
  state = {
      count: 1,
      lines: [],
      mutes: [],
      expoPushToken: '',
      notification: {}
  };

  registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        this.setState({ expoPushToken: token });
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        });
      }
    };

  handleToggle = index => {
     let tempArr= this.state.lines
     tempArr[index].muted = !tempArr[index].muted
     this.setState({mutes:tempArr})
  }

  getDocs(sec){
    const secArr = []
    const names = []
    var count = 0
    const secLine = sec.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              const data = doc.id
              const name = doc.data().name
              const muted = doc.data().isMuted
              names.push(name)

              secArr.push({docID:data,name:name, muted: muted, index:count})
              count = count + 1
            })
            console.log("sec", secArr)
          })
          .catch(error => console.log(error))
    return secArr;
  }

  _handleNotification = notification => {
      Vibration.vibrate();
      console.log(notification);
      this.setState({ notification: notification });
    };
    sendPushNotification = async () => {
      const message = {
        to: this.state.expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
        _displayInForeground: true,
      };
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Accept-encoding': 'gzip, deflate',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(message),
   });
    };

  async componentDidMount(){
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    var user = firebase.auth().currentUser;
    console.log(user.uid)
    const sec = db.collection('users').doc(user.uid).collection('cameras').doc(global.cameraID).collection('SecurityLines')
    let secArr = await this.getDocs(sec);
    await sleep(2000)
    await this.setState({lines: await secArr});


    }

render(){
  console.log("data", this.state.mutes)
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Line Name</DataTable.Title>
          <DataTable.Title numeric>Mute Notifications</DataTable.Title>
          </DataTable.Header>

          { this.state.lines.map((id)=>(
          <DataTable.Row>
            <DataTable.Cell  style={{flex:1.4,width:200,height: 100}} >  {id.name}
            </DataTable.Cell>
            <DataTable.Cell style={{justifyContent: 'flex-end'}} >
            <Switch
            ios_backgroundColor="#3e3e3e"
            onValueChange = {() => this.handleToggle(id.index)}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            value = {id.muted}
            >
            </Switch></DataTable.Cell>
          </DataTable.Row>))}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
        <Button title={'Press to Send Notification'} onPress={() => this.sendPushNotification()} />

      </DataTable>
      </ScrollView>
    );
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
export default CameraData;
