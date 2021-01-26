import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import axios from 'axios';

const Things = ({navigation}) => {
  const [things, setThings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getThings();
    }, 2000);
  }, []);

  const getThings = async () => {
    try {
      let res = await axios.get('http://localhost:3001/api/things');
      setThings(res.data);
      console.log(res.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Error Occured');
      setLoading(false);
    }
  };
  const likeClicked = async (id) => {
    console.log(id);
    try {
      let res = await axios.put(`http://localhost:3001/api/like/${id}`);
      let updatedThings = things.map((t) => (t.id == id ? res.data : t));
      setThings(updatedThings.sort((a, b) => b.likes - a.likes));
    } catch (err) {
      console.log(err);
    }
  };

  const renderThings = () => {
    return things.map((thing) => {
      return (
        <View style={styles.card} key={Math.random()}>
          <View style={styles.cardHeader}>
            <Text style={styles.header}>{thing.name}</Text>
            <Text style={styles.paragraph}> {thing.likes}</Text>
          </View>
          <TouchableOpacity
            onPress={() => likeClicked(thing.id)}
            style={styles.button}>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Thing', {...thing})}
            style={styles.button}>
            <Text>View</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const renderContent = () => {
    if (loading)
      return (
        <>
          <Text style={styles.header}>loading</Text>
          <ActivityIndicator size="large" color="#00ff00" />
        </>
      );
    if (error) return <Text>error occured</Text>;
    return <ScrollView>{renderThings()}</ScrollView>;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.header}>My APP</Text>
        {renderContent()}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 34,
  },
  cardHeader: {
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: 'red',
  },
  paragraph: {
    fontSize: 22,
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: 5,
    minHeight: 200,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    padding: 14,
    shadowColor: '#ddd',
    backgroundColor: 'white',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 3,
    shadowOpacity: 20,
    color: 'white',
    margin: 2,
  },
});

export default Things;