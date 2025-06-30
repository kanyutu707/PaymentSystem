import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, GestureResponderEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import DropdownMenu from '../components/DropDownMenu';
import MenuOption from '../components/MenuOption';

const Payment: React.FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  const handleNavigate = (path: any) => () => {
    setVisible(false);
    router.navigate(path);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        
        {/* Dropdown Menu */}
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
            <MenuOption onSelect={handleNavigate('../payments/current')}>
              <Text style={styles.menuOptionText}>Current Transaction</Text>
            </MenuOption>
            <MenuOption onSelect={handleNavigate('../payments/deffered')}>
              <Text style={styles.menuOptionText}>Deferred Transaction</Text>
            </MenuOption>
          </DropdownMenu>
        </View>

        {/* Payment Options */}
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
          onPress={() => router.navigate('../payments/sentprocessing')}
        >
          <Text style={styles.paymentCardText}>Send Processing</Text>
          <View style={styles.processingIndicator}>
            <Text style={styles.processingText}>●</Text>
          </View>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => router.navigate('../payments/receivedprocessing')}
        >
          <Text style={styles.paymentCardText}>Received Processing</Text>
          <View style={styles.processingIndicator}>
            <Text style={styles.processingText}>●</Text>
          </View>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Dropdown Styles
  dropDownCont: {
    marginBottom: 24,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  dropDownContCard: {
    backgroundColor: "orange",
    height: 65,
    width: "100%",
    borderRadius: 14,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  // Payment Card Styles
  paymentCard: {
    backgroundColor: "white",
    height: 70,
    width: "100%",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "orange",
    shadowColor: "orange",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  paymentCardText: {
    fontSize: 17,
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
