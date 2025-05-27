import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownMenu from '../components/DropDownMenu';
import MenuOption from '../components/MenuOption';
import pay from '../payments/pay';

const payment = () => {
const router=useRouter();
const navigatePay=(pagename:string)=>{
    screen:pay(pagename);
    
}
 const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.dropDownCont}>
      <DropdownMenu
        visible={visible}
        handleOpen={() => setVisible(true)}
        handleClose={() => setVisible(false)}
        trigger={
          <View style={styles.dropDownContCard}>
            <Text style={styles.paymentCardText}>Initiate New Transaction</Text>
          <AntDesign name="downcircleo" size={24} color="color" />
          </View>
        }
      >
        <MenuOption  onSelect={() => {
           
          setVisible(false);
        }}>
          <Text style={styles.paymentCardText}  onPress={()=>navigatePay('current')}>Current Transaction</Text>
        </MenuOption>
        <MenuOption onSelect={() => {
           
          setVisible(false);
        }}>
          <Text style={styles.paymentCardText} onPress={()=>navigatePay('deffered')}>Deffered Transaction</Text>
        </MenuOption>
      </DropdownMenu>
    </View>
    
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
      </ScrollView>
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
  },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  dropDownCont:{
     backgroundColor: "orange",
    height: 60,
    width: "100%",
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
  dropDownContCard:{
     backgroundColor: "orange",
    height: 60,
    width: "100%",
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
  }
})