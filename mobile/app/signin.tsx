import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const signin = () => {
  const router=useRouter();
  return (
    <SafeAreaView style={styles.signincontainer}>
      <View >
        <Pressable>Sign In</Pressable>
        <Pressable>Sign In</Pressable>
      </View>
      <View style={styles.signinform}>
          <Text style={styles.signinlabel}>Email</Text>
          <TextInput placeholder='email' style={styles.signininput}/>

          <Text style={styles.signinlabel}>Password</Text>
          <TextInput placeholder='email' style={styles.signininput}/>

          <Pressable onPress={()=>router.navigate("./(tabs)")}>
         <Text>SIGN IN</Text>
       </Pressable>
      </View>
    
       </SafeAreaView>
  )
}

export default signin

const styles = StyleSheet.create({
  signincontainer:{
      width:"100%",
      height:"100%",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"white",
     
  },
  signinform:{
    backgroundColor:"white",
    borderWidth:2,
    borderColor:"orange",
    width:"80%",
    borderRadius:4,
    padding:3
  },
  signinlabel:{
    marginBottom:5,
    fontWeight:700,
    marginTop:7
  },
  signininput:{
    height:50,
    marginVertical:10,
    width:"98%",
    borderWidth:1,
    borderColor:"orange"
  }
})