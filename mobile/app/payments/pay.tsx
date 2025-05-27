import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
const pay = (name:string) => {
 
  return (
    <View>
    {name==="current"?<ScrollView><Text>current</Text></ScrollView>:<ScrollView><Text>deffered</Text></ScrollView>}
    </View>
  )
}

export default pay

const styles = StyleSheet.create({})