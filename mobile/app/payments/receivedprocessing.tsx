import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface receivedItem {
  accountNo: string;
  amount: string | number;
}

const Received: React.FC = () => {

  const [receivedData, setReceivedData] = useState<receivedItem[]>([]);

  useEffect(() => {
    getreceived();
  }, [])

  const apiUrl = Constants?.expoConfig?.extra?.apiUrl;
  const getData = async (): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value ?? null;
    } catch (e) {
      console.error('Error fetching token:', e);
      return null;
    }
  };

  const getreceived = async (): Promise<void> => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/payment/getByReceiverProcessing`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json();
    if (response.status == 200) {
      setReceivedData(result);
    }
    else {
      console.error("User not selected")
    }

  }

  return (
    <SafeAreaView style={styles.searchcontainer}>
      <TextInput style={styles.searchbar} placeholder='input your search query ...'></TextInput>
      <ScrollView showsVerticalScrollIndicator={false}>
        {receivedData == null ? (<Text>sorry data not found</Text>) : (
          receivedData.map((singlereceived: receivedItem, index: number) => (
            <View key={index} style={styles.singlereceived}>
              <View style={styles.singlereceivedTop}>
                <Text style={styles.singlereceivedTopAcc}>{singlereceived.accountNo}</Text>
                <Text style={styles.singlereceivedTopAmt}>{singlereceived.amount}</Text>
              </View>
              <Text style={styles.singlereceivedBottom}>14/3/2020</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Received

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
  singlereceived: {
    backgroundColor: "white",
    width: "98%",
    height: 70,
    borderRadius: 6,
    marginVertical: 7,
    flexDirection: "column",
    borderColor: "orange",
    borderWidth: 2,
    padding: 2,
    justifyContent: "space-evenly"
  },
  singlereceivedTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6
  },
  singlereceivedTopAcc: {
    fontSize: 20,
    fontWeight: "700"
  },
  singlereceivedTopAmt: {
    fontSize: 19,
    fontWeight: "500"
  },
  singlereceivedBottom: {
    fontSize: 13,
    fontWeight: "800",
    color: "orange"
  }
})