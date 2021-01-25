
import React from 'react';
import {useState, useEffect} from "react"
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
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


  const likeClicked = async (id) => {
    console.log(id)
    try {
      let res = await axios.put(`http://localhost:3001/api/likes/${id}`)
      let updatedThings = things.map(t => t.id === id ? res.data : t)
      setThings(updatedThings.sort((a,b)=> b.likes - a.likes))
    } catch (error) {
      console.log(error)
    }
    
  }

  const renderThings = () => {
    return things.map((thing) => {
      return (
        <View style={styles.card} key={Math.random()}>
          <Text style={styles.border}>Name: {thing.name}</Text>
          <Text style={styles.border}>likes: {thing.likes}</Text>
          <TouchableOpacity 
            onPress = {()=>likeClicked(thing.id)}
            style={styles.button}
            >
            <Text>
              Like
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
      <>
      <Text>Loading</Text>
      <ActivityIndicator/>
      </>
      )}
    if (error) {return <Text>Error</Text>}
    return renderThings()
    }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
        {renderContent()}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    padding: 8
  },

  border: {
    borderWidth: 1,
    borderColor: "red",
  },

  paragraph: {
    fontSize: 12,
    padding: 6
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "red",
    marginHorizontal: 10, 
    marginVertical: 5,
    minHeight: 200
  },

  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems:'center',
    padding: 4, 
    shadowColor: '#ccc',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 4,
    shadowOpacity: 10,
    backgroundColor: 'white',
    margin: 10,
    color: "white"
  }
});

export default App;
