import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.indexcontainer}>
      <View style={styles.indexbal}>
        <View style={styles.indexSecondCol}>
          <Text style={styles.indexBalTitle}>Balance</Text>
          <Text style={styles.indexBalNum}>$ 5000</Text>
        </View>
        <MaterialIcons name="account-balance" size={50} margin={25} color="orange" />
      </View>
      <View style={styles.accountnumberholder}><Text style={styles.accountnumbertitle}>Account Number: </Text><Text style={styles.accountnumber}>BR2CCMNSRDDWE</Text></View>
      <View style={styles.extras}>
        <View style={styles.extrarow}>
          <View style={styles.extra}>
            <Text style={styles.extraTitle}>Deposit</Text>
            <Ionicons name="bag-add-sharp" size={25} color="black" />
            <Text style={styles.extraValue}>$ 15000</Text>
            <Text style={styles.extraDate}>15/2/2020</Text>
          </View>
          <View style={styles.extra}>
            <Text style={styles.extraTitle}>Withdrawals</Text>
            <MaterialCommunityIcons name="bank-remove" size={25} color="black" />
            <Text style={styles.extraValue}>$ 15000</Text>
            <Text style={styles.extraDate}>15/2/2020</Text>
          </View>
        </View>
        <View style={styles.extrarow}>
          <View style={styles.extra}>
            <Text style={styles.extraTitle}>Recieved</Text>
            <FontAwesome5 name="receipt" size={25} color="black" />
            <Text style={styles.extraValue}>$ 15000</Text>
            <Text style={styles.extraDate}>15/2/2020</Text>
          </View>
          <View style={styles.extra}>
            <Text style={styles.extraTitle}>Sent</Text>
            <MaterialIcons name="payments" size={25} color="black" />
            <Text style={styles.extraValue}>$ 15000</Text>
            <Text style={styles.extraDate}>15/2/2020</Text>
          </View>
        </View>
      </View>
      <View style={styles.membershipcontainer}><Text style={styles.membershiptitle}>Membership</Text><Text style={styles.membership}>GOLD</Text><MaterialCommunityIcons name="medal" size={30} color="gold" /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  indexcontainer: {
    backgroundColor: "whitesmoke",
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  indexbal: {
    height: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

  },
  indexBalTitle: {
    fontSize: 24,
    fontWeight: 800,

  },
  indexBalNum: {
    fontSize: 21,
    fontWeight: 700,
    margin: 5,
    color: 'orange'
  },
  indexSecondCol: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
    margin: 10

  },
  accountnumberholder: {
    backgroundColor: "white",
    width: "100%",
    height: 80,
    marginVertical: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: "column",
    justifyContent: 'space-around',
    paddingLeft: 5,
    alignItems: "flex-start"

  },
  accountnumbertitle: {
    fontSize: 17,
    color: "black",
    fontWeight: 700,
    alignItems: "center"
  },
  accountnumber: {
    fontSize: 15,
    color: "orange",
    fontWeight: 500,
    alignItems: "center"
  },
  extras: {
    flexDirection: "row",
    width: "100%"
  },
  extrarow: {
    flexDirection: "column",
    width: "50%"
  },
  extra: {
    backgroundColor: "white",
    margin: "2%",
    width: "97%",
    height: 200,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: 14,
    justifyContent: "space-evenly"
  },
  extraTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginVertical: 5,
  },
  extraValue: {
    fontSize: 15,
    fontWeight: 600
  },
  extraDate: {
    fontSize: 12,
    fontWeight: 600,
    color: "orange"
  },
  membershipcontainer: {
    backgroundColor: "white",
    width: "100%",
    height: 70,
    marginVertical: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 10,
    alignItems: "center"
  },
  membershiptitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "orange"
  },
  membership: {
    fontSize: 16,
    fontWeight: 700
  }
})