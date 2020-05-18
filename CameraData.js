import React, { Component, Container, Header, Title, List } from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';

class CameraData extends Component {


  constructor(props) {
   super(props);
   this.state = { dataSource: [] }
 }

 componentDidMount = () => {
   fetch('http://localhost:4006/users', {
     method: 'GET'
   })
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         dataSource: responseJson
       })
     })
     .catch((error) => {
       console.error(error);
     });
    console.log("print")
    console.log(this.state.dataSource)
 }

 render() {
   return (
     <View >
      <Text>Welcome</Text>

      <FlatList
      data={this.state.dataSource}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({item}) =>

      <View style={{backgroundColor:'#abc123',padding:10,margin:10}}>
         <Text style={{color:'#fff', fontWeight:'bold'}}>{item.username}</Text>
         <Text style={{color:'#fff'}}>{item.email}</Text>
        </View>

      }

      />
     </View>
   );
 }
}
export default CameraData;
