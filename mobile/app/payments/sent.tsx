import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const sent = () => {
  return (
    <SafeAreaView style={styles.searchcontainer}>

      <TextInput style={styles.searchbar} placeholder='input your search query ...'></TextInput>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
        <View style={styles.singleSent}>
          <View style={styles.singleSentTop}>
            <Text style={styles.singleSentTopAcc}>CR24DREDDFDD</Text>
            <Text style={styles.singleSentTopAmt}>$ 2000</Text>
          </View>
          <Text style={styles.singleSentBottom}>14/3/2020</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default sent

const styles = StyleSheet.create({
  searchcontainer: {
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "white"
  },
  searchbar: {
    backgroundColor: "white",
    width: "100%",
    height: 55,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20
  },
  singleSent: {
    backgroundColor: "white",
    width: "98%",
    height: 70,
    borderRadius: 6,
    marginVertical: 7,
    flexDirection: "column",
    borderColor: "orange",
    borderWidth: 2,
    padding:2,
    justifyContent: "space-evenly"
  },
  singleSentTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6
  },
  singleSentTopAcc: {
    fontSize: 20,
    fontWeight: 700
  },
  singleSentTopAmt: {
    fontSize: 19,
    fontWeight: 500
  },
  singleSentBottom: {
    fontSize: 13,
    fontWeight: 800,
    color: "orange"
  }
})