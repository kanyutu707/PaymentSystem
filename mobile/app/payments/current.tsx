import { TouchableOpacity, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const current = () => {
  const [isOpen, setIsOpen]=useState<boolean>(false);
  const[selectedStyle, setselectedStyle]=useState<any>(styles.none);
  const handleChange=()=>{
  setIsOpen(!isOpen);
  handleStyle();
}

const handleStyle=()=>{
  if(isOpen){
    setselectedStyle(styles.none);
  }else{
    setselectedStyle(styles.form);
  }
}

const [isChanged, setIsChanged]=useState<boolean>(false);
const [writtenText, setWrittenText]=useState<string>('Tap To Pay');

const handleTextChangeText=()=>{
    setIsChanged(!isChanged);
    changeText();
}
const changeText=()=>{
  if(isChanged){
    setWrittenText('Establishing connection ...');
  }
  else{
    setWrittenText('Tap To Pay')
  }
}
  return (
    <View style={styles.callToAction}>
      <TouchableOpacity style={styles.actionButton} onPress={handleTextChangeText}><MaterialCommunityIcons name="gesture-tap-button" size={24} color="orange" /><Text style={styles.actionButtonTxt}>{writtenText}</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={handleChange}><MaterialIcons name="question-answer" size={24} color="orange" /><Text style={styles.actionButtonTxt}>ACCOUNT NUMBER</Text></TouchableOpacity>
      <View style={selectedStyle} >
        <Text style={styles.formLabel}>ACCOUNT NUMBER</Text>
        <TextInput style={styles.formInput} />
        <Text style={styles.formLabel}>AMOUNT</Text>
        <TextInput style={styles.formInput} />
        <Pressable style={styles.formButton}><Text style={styles.formButtonTxt}>SUBMIT</Text></Pressable>
      </View>
    </View>
  )
}

export default current

const styles = StyleSheet.create({
  none:{
    display:"none"
  },
  callToAction: {
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  actionButton: {
    marginVertical: 10,
    width: "90%",
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "orange",
    borderWidth: 2
  },
  actionButtonTxt: {
    fontWeight: 700
  },
  formInput: {
    marginVertical: 8,
    borderColor: "orange",
    borderWidth: 2
  },
  form: {
    backgroundColor: "white",
    width: "90%",
    height: 250,
    flexDirection: "column",
    padding: 8,
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 4,
   
  },
  formLabel: {
    marginVertical: 5,
    fontWeight: 700
  },
  formButton: {
    height: 50,
    width: 100,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5
  },
  formButtonTxt: {
    color: "black",
    fontWeight: 700
  }
})