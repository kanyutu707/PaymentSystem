import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const deffered = () => {
const [isOpen, setIsOpen]=useState<boolean>(false);
const[selectedStyle, setselectedStyle]=useState<any>(styles.none);

const[isOpen2, setIsOpen2]=useState<boolean>(false);
const[selectedStyle2, setselectedStyle2]=useState<any>(styles.none);


const handleChange2=()=>{
  setIsOpen2(!isOpen2);
  handleStyle2();
}

const handleStyle2=()=>{
  if(isOpen2){
    setselectedStyle2(styles.none);
  }else{
    setselectedStyle2(styles.form);
  }
}
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
  return (
    <SafeAreaView style={styles.callToAction}>
    <ScrollView style={styles.callToActionSub} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.actionButton} onPress={handleChange2}><Text style={styles.actionButtonTxt} >Date Lock</Text></Pressable>
      <View style={selectedStyle2}>
        <Text style={styles.formLabel}>ACCOUNT NUMBER</Text>
        <TextInput style={styles.formInput} />
        <Text style={styles.formLabel}>AMOUNT</Text>
        <TextInput style={styles.formInput} />
         <Text style={styles.formLabel}>Date</Text>
        <TextInput style={styles.formInput} />
         <Text style={styles.formLabel}>MULTIPLE WITHDRAWALS</Text>
        <TextInput style={styles.formInput} />
        <Pressable style={styles.formButton}><Text style={styles.formButtonTxt}>SUBMIT</Text></Pressable>
      </View>
      <Pressable style={styles.actionButton} onPress={handleChange}><Text style={styles.actionButtonTxt} >Code Lock</Text></Pressable>
      <View style={selectedStyle}>
        <Text style={styles.formLabel}>ACCOUNT NUMBER</Text>
        <TextInput style={styles.formInput} />
        <Text style={styles.formLabel}>AMOUNT</Text>
        <TextInput style={styles.formInput} />
         <Text style={styles.formLabel}>MULTIPLE WITHDRAWALS</Text>
        <TextInput style={styles.formInput} />
        <Pressable style={styles.formButton}><Text style={styles.formButtonTxt}>REQUEST CODE</Text></Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default deffered

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
    backgroundColor:"white"
  },
  callToActionSub:{
    width:"100%"
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
    fontWeight: 700,
    color:"black"
  },
  formInput: {
    borderColor: "black",
    borderWidth: 3,
    marginVertical: 8
  },
  form: {
    backgroundColor: "white",
    width: "90%",
    maxHeight: 450,
    flexDirection: "column",
    padding: 8,
    justifyContent: "center",
    borderRadius: 10
  },
  formLabel: {
    marginVertical: 5,
    fontWeight: 700
  },
  formButton: {
    height: 50,
    maxWidth: 200,
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