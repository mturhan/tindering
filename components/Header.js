import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  return (
    <View className="p-2 flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="chevron-back-outline" size={34} color="#ff5864" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className="p-3 rounded-full mr-4 bg-red-200">
          <Foundation className="" name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
