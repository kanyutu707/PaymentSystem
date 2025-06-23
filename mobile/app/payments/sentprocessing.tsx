import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SentItem {
  accountNo: string;
  amount: string | number;
}

const sent: React.FC = () => {

  const [sent, setSent] = useState<SentItem[]>([]);

  useEffect(() => {
    getSent();
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

  const getSent = async (): Promise<void> => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/payment/getBySenderProcessing`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json();
    if (response.status == 200) {
      setSent(result);
    }
    else {
      console.error("User not selected")
    }

  }

  return (
    <SafeAreaView style={styles.searchcontainer}>

      <TextInput style={styles.searchbar} placeholder='input your search query ...'></TextInput>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sent == null ? (<Text>sorry data not found</Text>) : (
          sent.map((singleSent: SentItem, index: number) => (
            <View key={index} style={styles.singleSent}>
              <View style={styles.singleSentTop}>
                <Text style={styles.singleSentTopAcc}>{singleSent.accountNo}</Text>
                <Text style={styles.singleSentTopAmt}>{singleSent.amount}</Text>
              </View>
              <Text style={styles.singleSentBottom}>14/3/2020</Text>
            </View>
          ))
        )}

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
    padding: 2,
    justifyContent: "space-evenly"
  },
  singleSentTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6
  },
  singleSentTopAcc: {
    fontSize: 20,
    fontWeight: "700"
  },
  singleSentTopAmt: {
    fontSize: 19,
    fontWeight: "500"
  },
  singleSentBottom: {
    fontSize: 13,
    fontWeight: "800",
    color: "orange"
  }
})