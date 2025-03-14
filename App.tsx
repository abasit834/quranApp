import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Quran from './App/Quran';
import SurahScreen  from './App/SurahScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Quran" component={Quran} options={{headerShown : false}} />
        <Stack.Screen name="Surahs" component={SurahScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;