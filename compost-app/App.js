import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as announcements from './Database.json';
let n = announcements.length;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Announcements</Text>
      <StatusBar style="auto" />
      
      <Text>Number of announcements: {n}</Text>
      
      <AnnouncementView />
      
      <Text>Footer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Announcement = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <a href = {props.link}>{props.link}</a>
    </div>
  );
}

const AnnouncementView = () => {
  for (var i = 0; i < 3; i++) {
  return (
    <Announcement title = {announcements.Title[i]} desc = {announcements.Description[i]} link = {announcements.Link[i]}/>
    );
  }
}

/*export class Table extends React.Component {
 
 constructor(props){
 super(props);
 this.getHeader = this.getHeader.bind(this);
 this.getRowsData = this.getRowsData.bind(this);
 this.getKeys = this.getKeys.bind(this);
 }
 
 getKeys = function(){
   return Object.keys(this.props.data[0]);
 }
 
 getHeader = function(){
   var keys = this.getKeys();
   return keys.map((key, index)=>{
   return <th key={key}>{key.toUpperCase()}</th>
   })
 }
 
 getRowsData = function(){
   var items = this.props.data;
   var keys = this.getKeys();
   return items.map((row, index)=>{
   return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
   })
 }
 
 render() {
 return (
 <div>
 <table>
 <thead>
 <tr>{this.getHeader()}</tr>
 </thead>
 <tbody>
 {this.getRowsData()}
 </tbody>
 </table>
 </div>
 
 );
 }
}
const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
  return <td key={props.data[key]}>{props.data[key]}</td>
  })
}*/
