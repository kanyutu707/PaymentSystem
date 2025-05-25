import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo';

const transact = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.transactCard}>
        <Text style={styles.transactCardText}>Deposit</Text>
        <Entypo name="chevron-right" size={30} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.transactCard}>
        <Text style={styles.transactCardText}>Withdraw</Text>
        <Entypo name="chevron-right" size={30} color="orange" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default transact

const styles = StyleSheet.create({
  transactContainer: {
    backgroundColor: "whitesmoke",
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent:"center"
  },
  transactCard: {
    backgroundColor: "white",
    height: 60,
    width: "98%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:10
  },
  transactCardText:{
    fontSize:20,
    fontWeight:700,
    paddingLeft:10
  }
})