import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const signin = () => {
  const router=useRouter();
  return (
    <SafeAreaView>
    <Pressable onPress={()=>router.navigate("./(tabs)")}>
         <Text>index</Text>
       </Pressable>
       </SafeAreaView>
  )
}

export default signin

const styles = StyleSheet.create({})