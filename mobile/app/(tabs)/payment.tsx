import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const payment = () => {
const router=useRouter();
  return (
    <SafeAreaView>
       <TouchableOpacity style={styles.inittransferbutton}  onPress={() => router.navigate('../payments/initiate')}><Text style={styles.initTransferButtonTxt}>Initiate New Transfer</Text><MaterialIcons name="start" size={24} color="black" /></TouchableOpacity>
      <TouchableOpacity style={styles.paymentCard} onPress={() => router.navigate('../payments/received')} >
        <Text style={styles.paymentCardText}>Received</Text>
        <Entypo name="chevron-right" size={30} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentCard} onPress={() => router.navigate('../payments/sent')}>
        <Text style={styles.paymentCardText}>Sent</Text>
        <Entypo name="chevron-right" size={30} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentCard} onPress={() => router.navigate('../payments/sent')}>
        <Text style={styles.paymentCardText}>Send Processing</Text>
        <Entypo name="chevron-right" size={30} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentCard} onPress={() => router.navigate('../payments/sent')}>
        <Text style={styles.paymentCardText}>Received Processing</Text>
        <Entypo name="chevron-right" size={30} color="orange" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default payment

const styles = StyleSheet.create({
  paymentContainer: {
    backgroundColor: "whitesmoke",
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent:"center"
  },
  paymentCard: {
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
  paymentCardText:{
    fontSize:17,
    fontWeight:700,
    paddingLeft:10
  },
  inittransferbutton: {
    backgroundColor: "orange",
    alignItems: 'center',
    justifyContent: 'space-around',
    width: "98%",
    flexDirection:"row",
    height: 45,
    marginVertical: 5,
    marginBottom:9,
    borderRadius: 4,
    borderColor: "gold",
    borderWidth: 2
  },
  initTransferButtonTxt: {
    fontSize: 18,
    fontWeight: 500,
  }
})