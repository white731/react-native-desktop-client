import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';

export default ThingForm = ({navigation}) => {

  const [name, setName] = useState("")
  const [likes, setLikes] = useState("")

  const handleSubmit = async () => {
    try {
      let res = await axios.post(`http://localhost:3001/api/things/`,{name, likes})
      alert("worked")
      navigation.navigate('Things', {data:res.data})
    } catch (error) {
      console.log(error)
      alert("didn't work")
    }
  }
  

  return (
    <View>
      <Text>THING FORM HERE</Text>
      <Text>Name</Text>
      <TextInput 
        style={{height:40, borderColor:'#bbb', borderWidth:2}}
        value = {name}
        onChangeText = {(text)=>{setName(text)}}
      />
      <Text>Likes</Text>
      <TextInput 
        style={{height:40, borderColor:'#bbb', borderWidth:2}}
        value = {likes}
        onChangeText = {(text)=>{setLikes(text)}}
      />
      <Button
        title="Submit"
        onPress={()=>{handleSubmit()}}
      ></Button>
    </View>
  );
};