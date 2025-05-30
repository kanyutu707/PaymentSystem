import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownMenu from '../components/DropDownMenu';
import MenuOption from '../components/MenuOption';
import { useRouter } from 'expo-router';

const payment = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>

        <View style={styles.dropDownCont}>
          <DropdownMenu
            visible={visible}
            handleOpen={() => setVisible(true)}
            handleClose={() => setVisible(false)}
            trigger={
              <View style={styles.dropDownContCard}>
                <Text style={styles.dropdownText}>Initiate New Transaction</Text>
                <AntDesign name="downcircleo" size={24} color="white" />
              </View>
            }
          >
            <MenuOption onSelect={() => {
              setVisible(false);
            }}>
              <Text
                style={styles.menuOptionText}
                onPress={() => router.navigate('../payments/current')}
              >
                Current Transaction
              </Text>
            </MenuOption>
            <MenuOption onSelect={() => {
              setVisible(false);
            }}>
              <Text
                style={styles.menuOptionText}
                onPress={() => router.navigate('../payments/deffered')}
              >
                Deferred Transaction
              </Text>
            </MenuOption>
          </DropdownMenu>
        </View>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => router.navigate('../payments/received')}
        >
          <Text style={styles.paymentCardText}>Received</Text>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => router.navigate('../payments/sent')}
        >
          <Text style={styles.paymentCardText}>Sent</Text>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => router.navigate('../payments/send-processing')}
        >
          <Text style={styles.paymentCardText}>Send Processing</Text>
          <View style={styles.processingIndicator}>
            <Text style={styles.processingText}>●</Text>
          </View>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => router.navigate('../payments/received-processing')}
        >
          <Text style={styles.paymentCardText}>Received Processing</Text>
          <View style={styles.processingIndicator}>
            <Text style={styles.processingText}>●</Text>
          </View>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

export default payment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Dropdown Styles
  dropDownCont: {
    marginBottom: 24,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropDownContCard: {
    backgroundColor: "orange",
    height: 65,
    width: "100%",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  menuOptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    padding: 12,
  },

  // Payment Card Styles
  paymentCard: {
    backgroundColor: "white",
    height: 70,
    width: "100%",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "orange",
    shadowColor: "orange",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  paymentCardText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
    flex: 1,
  },

  // Processing Indicator
  processingIndicator: {
    marginRight: 12,
  },
  processingText: {
    fontSize: 20,
    color: "orange",
    fontWeight: "bold",
  },
});