import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import CameraData from'../screens/CameraData.js';
import Home from '../screens/HomeScreen.js'
import { db,app } from '../App0.js';
import firebase from 'firebase';

import 'firebase/firestore';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, pasword } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))

  }
  render() {
    return (
      <View style={styles.container}>

        <Image
              style={{width: 50, height: 50, marginBottom: '20%'}}
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
              resizeMode={'cover'}
          />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {this.state.errorMessage &&
          <Text style={{marginTop:'10%',marginBottom:'10%', color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Button style={{borderRadius:'5', width: '30%'}} title="Login" onPress={this.handleLogin} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  textInput: {
    width: '60%',
    fontSize: 18,
    color: 'black',
    marginBottom: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  }
})
