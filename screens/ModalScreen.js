import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />

      <Text className="text-xl text-gray-500 p-2 font-bold">
        Welcome {user.displayName}
      </Text>

      <Text className="text-center p-4 font-bold text-red-400">
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        className="text-center text-xl pb-2"
        placeholder="Enter a Profile Pic URL"
      />

      <Text className="text-center p-4 font-bold text-red-400">
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        className="text-center text-xl pb-2"
        placeholder="Enter your ocuupation"
      />

      <Text className="text-center p-4 font-bold text-red-400">
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        className="text-center text-xl pb-2"
        placeholder="Enter your age"
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        className={`w-64 p-3 rounded-xl absolute bottom-10 ${
          incompleteForm ? "bg-gray-400" : "bg-red-400"
        }`}
        onPress={updateUserProfile}
      >
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
