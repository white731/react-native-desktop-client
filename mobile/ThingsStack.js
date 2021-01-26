import React from 'react';

import {createStackNavigator} from '@react-navigation/stack'
import { create } from 'react-test-renderer';
import Things from './Things';
import Thing from './Thing';
import ThingForm from './ThingForm';
import { Button } from 'react-native';

const Stack = createStackNavigator()

const ThingsStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Things"
        component={Things}
        options={{
          headerTitle: 'Hello',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ThingForm')}
              title="Add"
              color="#222"
            />
          ),
        }}
      />
      <Stack.Screen name="Thing" component={Thing} />
      <Stack.Screen name="ThingForm" component={ThingForm} />
    </Stack.Navigator>
  )
}

export default ThingsStack