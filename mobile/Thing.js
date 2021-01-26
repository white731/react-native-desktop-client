import React from 'react'
import { View, Text } from "react-native"


const Thing = ({navigation, route}) => {
  const {id, name, likes} = route.params
return (
  <View>
    <Text>Thing Show page Here</Text>
    <Text>{id}</Text>
    <Text>{name}</Text>
    <Text>{likes}</Text>
  </View>
)
}

export default Thing