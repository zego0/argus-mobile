import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import TabBarIcon from '../components/TabBarIcon';

export default function NavigationHistory() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


    <DataTable>
            <DataTable.Header>
              <DataTable.Title>Crossed Line Name</DataTable.Title>
              <DataTable.Title numeric>Date</DataTable.Title>
              <DataTable.Title numeric>Time</DataTable.Title>
              <DataTable.Title numeric>Watch </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell style={{alignSelf: 'flex-start', height: 100}} >
              <Text
                style={styles.input}
                multiline={true}
                underlineColorAndroid='transparent'>
                Line 1</Text>

              </DataTable.Cell>
              <DataTable.Cell numeric>12.12.12</DataTable.Cell>
              <DataTable.Cell numeric>22:13</DataTable.Cell>
              <DataTable.Cell numeric><TabBarIcon  name="md-camera" /></DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell style={{alignSelf: 'flex-start', height: 100}}>Line 2</DataTable.Cell>
              <DataTable.Cell numeric>11.12.12</DataTable.Cell>
              <DataTable.Cell numeric>20:11</DataTable.Cell>
              <DataTable.Cell numeric><TabBarIcon  name="md-camera" /></DataTable.Cell>
            </DataTable.Row>


          </DataTable>

    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
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
