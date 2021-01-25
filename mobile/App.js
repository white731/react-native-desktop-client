
import React from 'react';
import {useState, useEffect} from "react"
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
} from 'react-native';
import axios from 'axios'


const App = () => {
  const [things, setThings] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] =useState(true)

  useEffect(()=>{
    getThings()
  },[])

  const getThings = async () =>{
    try {
      let res = await axios.get("http://localhost:3001/api/things")
      setThings(res.data)
      setLoading(false)
      setError(null)
      console.log(res.data)
    } catch (error) {
      setError(true)
    }
  }
  const renderThings = () => {
    return things.map((thing) => {
      return (
        <View key={Math.random()}>
          <Text>Name: {thing.name}</Text>
          <Text>likes: {thing.likes}</Text>
        </View>
      );
    });
  };

  const renderContent = () => {
    if (loading) {return <Text>Loading</Text>}
    if (error) {return <Text>Error</Text>}
    return renderThings()
    }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {renderContent()}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
