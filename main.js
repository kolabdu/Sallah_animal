// Install necessary packages
npm install @react-navigation/native @react-navigation/stack react-native-elements axios

// Create the app structure and navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AnimalDetailScreen from './screens/AnimalDetailScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AnimalDetail" component={AnimalDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Sample HomeScreen component
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    axios.get('http://your-api-url/animals/')
      .then(response => setAnimals(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <FlatList
        data={animals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AnimalDetail', { animal: item })}>
            <Text>{item.type} - {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
