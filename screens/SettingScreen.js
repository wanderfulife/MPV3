import React, { useLayoutEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView, 
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import {TextInput, Button, FormErrorMessage } from "../components";
import {
  db,
  storage,
  ref,
  Colors,
  uploadBytes,
  getDownloadURL
} from "../config";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { Feather } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../providers";
import Header from "../chatComponents/Header";




const InformationScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [lookingForJob, setLookingForJob] = useState(true)
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
    const { user } = useContext(AuthenticatedUserContext);

  

  const incompleteForm =
    !name || !city || !occupation || !age || !imageUrl ;
  



  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: name,
      age: age,
      city: city,
      job: occupation,
      lookingForJob: lookingForJob,
      photoURL: imageUrl,
      timestamp: serverTimestamp()
    })
      .then(() => {
          console.log("User created in Firestore Database");

        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    setLoading(true);
    if (!result.cancelled) {
      const reference = ref(storage, user.uid);
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(reference, bytes);
      await getDownloadURL(reference)
        .then((x) => {
          setImageUrl(x);
        })
        .finally(() => {
          console.log("Picture uploaded in Firebase storage");
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header  />
      <View style={styles.container} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.imageView} >
              {imageUrl ? (
                <Image
                  style={styles.image}
                  source={{ uri: imageUrl }}
                />
              ) : (
                <TouchableOpacity
                style={styles.touchableImage}
                  onPress={pickImage}
                >
                  {!loading ? (
                    <MaterialCommunityIcons
                      name="camera-plus-outline"
                      size={24}
                      color="#4f46e5"
                    />
                  ) : (
                    <ActivityIndicator size='small' color={Colors.green} />
                  )}
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
            ></TextInput>
            <TextInput
              value={age}
              onChangeText={setAge}
              placeholder="Age"
            ></TextInput>
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="City"
            ></TextInput>
            <TextInput
              value={occupation}
              onChangeText={setOccupation}
              placeholder="Occupation"
            ></TextInput>

            <View style={styles.choicePicker}>
              <Text style={styles.textPicker} >
                Looking for :
              </Text>
            </View>

            <View style={styles.bottomButton} className="flex-row justify-around mt-4">
              <Button
              style={lookingForJob ? styles.jobButton : styles.choiceButtonDisabled}
                onPress={() => {
                  setLookingForJob(true);
                }}
              >
                 <Text style={styles.textJobButton} >Job</Text>
              </Button>
              <Button
              style={lookingForJob ? styles.choiceButtonDisabled : styles.staffButton}
                onPress={() => {
                  setLookingForJob(false);
                }}
              >
                <Text style={styles.textJobButton} >Staff</Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
        
          <TouchableOpacity
             disabled={incompleteForm}
            style={incompleteForm ? styles.updateButtonDisabled : styles.updateButton}
             onPress={updateUserProfile}
          >
            <Text style={styles.textUpdate}>
              Update Profile
            </Text>
          </TouchableOpacity>
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  safe: {
    flex: 1,
  },
  container: {
    padding: 5,
    alignItems: 'center'
   },

   imageView: {
    alignItems: 'center',
    paddingBottom: 10
   },
   image : {
    height: 40,
    width: 40,
    borderRadius: 100
   },
   touchableImage: {
    borderColor: Colors.purple,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1
   },
   choicePicker: {
    alignItems: 'center'
   },
   textPicker : {
    fontSize: 20,
    margin: 10, 
    fontWeight: '700',
    color: Colors.purple
   },
   bottomButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
   },
    jobButton: {
    marginTop:10,
    backgroundColor: Colors.green,
    padding: 20,
    borderRadius: 100,
    marginHorizontal: 20,
    width: 100
  },
  choiceButtonDisabled: {
    backgroundColor: 'lightgray',
    marginTop:10,
    padding: 20,
    borderRadius: 100,
    marginHorizontal: 20,
    width: 100
  },
    staffButton: {
    marginTop:10,
    backgroundColor: Colors.purple,
    padding: 20,
    borderRadius: 100,
    marginHorizontal: 20,
    width: 100
  },
  textJobButton: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '600'
  },
  updateButton: {
    backgroundColor: Colors.purple,
    width: 200,
    marginTop: 25,
    borderRadius: 100,
    padding: 15,
    alignItems: 'center'
  },
   updateButtonDisabled: {
    backgroundColor: 'lightgray',
    width: 200,
    borderRadius: 100,
    marginTop: 25,
    padding: 15,
    alignItems: 'center'
  },
  textUpdate: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20
  }
});
export default InformationScreen;


