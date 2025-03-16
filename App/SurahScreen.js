import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SurahList from "./SurahList";
import ParaList from "./ParaList";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const SurahsScreen = () => {
  return (
  <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarIndicatorStyle: { backgroundColor: "darkblue" },
        }}
      >
        <Tab.Screen name="SurahScreen" component={SurahList} />
        <Tab.Screen name="Paras" component={ParaList} />
      </Tab.Navigator>
   </View>
  );
};

export default SurahsScreen;