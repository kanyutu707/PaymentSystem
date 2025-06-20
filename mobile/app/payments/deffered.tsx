import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';

const deffered = () => {

  const apiUrl=Constants?.expoConfig?.extra?.apiUrl;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value ?? null;
    } catch (e) {
      console.error('Error fetching token:', e);
      return null;
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStyle, setselectedStyle] = useState<any>(styles.none);

  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [selectedStyle2, setselectedStyle2] = useState<any>(styles.none);

  const [amount, setAmount] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [receiver, setReceiver] = useState('');
  const [paymenttime, setPaymentTime] = useState('POSTPONED');

  const [amountCode, setAmountCode] = useState('');
  const [receiverCode, setReceiverCode] = useState('');


  const [isLoadingDate, setIsLoadingDate] = useState(false);
  const [isLoadingCode, setIsLoadingCode] = useState(false);

  const handleChange2 = () => {
    setIsOpen2(!isOpen2);
    handleStyle2();
  }

  const handleStyle2 = () => {
    if (isOpen2) {
      setselectedStyle2(styles.none);
    } else {
      setselectedStyle2(styles.form);
    }
  }

  const handleChange = () => {
    setIsOpen(!isOpen);
    handleStyle();
  }

  const handleStyle = () => {
    if (isOpen) {
      setselectedStyle(styles.none);
    } else {
      setselectedStyle(styles.form);
    }
  }

  const validateDateForm = () => {
    if (!receiver.trim()) {
      Alert.alert('Error', 'Please enter account number');
      return false;
    }
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    if (!paymenttime.trim()) {
      Alert.alert('Error', 'Please enter payment date');
      return false;
    }
    if (!confirmation.trim()) {
      Alert.alert('Error', 'Please enter confirmation code');
      return false;
    }
    return true;
  }

  const validateCodeForm = () => {
    if (!receiverCode.trim()) {
      Alert.alert('Error', 'Please enter account number');
      return false;
    }
    if (!amountCode.trim() || isNaN(Number(amountCode)) || Number(amountCode) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    return true;
  }

  const payDate = async () => {
    if (!validateDateForm()) return;

    const token = await getData();

    setIsLoadingDate(true);
    try {
      const response = await fetch(`${apiUrl}/payment/createByAccountNoDate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: Number(amount),
          confirmation,
          receiver: { accountNo: receiver },
          paymenttime
        })
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Date lock payment created successfully!');

        setAmount('');
        setConfirmation('');
        setReceiver('');
    
        setIsOpen2(false);
        setselectedStyle2(styles.none);
      } else {
        Alert.alert('Error', result.message || 'Failed to create date lock payment');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Date lock payment error:', error);
    } finally {
      setIsLoadingDate(false);
    }
  }

  const payCode = async () => {
    if (!validateCodeForm()) return;
    const token = await getData();
    setIsLoadingCode(true);
    try {
      const response = await fetch(`${apiUrl}/payment/createByAccountNoCode`, {
      
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: Number(amountCode),
          receiver: { accountNo: receiverCode },
          paymenttime
        })
      });
      const result = await response.json();
      

      if (response.ok) {
        Alert.alert('Success', `Code lock created! Your code: ${result.code || 'Check your email'}`);

        setAmountCode('');
        setReceiverCode('');

        setIsOpen(false);
        setselectedStyle(styles.none);
      } else {
        Alert.alert('Error', result.message || 'Failed to create code lock payment');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Code lock payment error:', error);
    } finally {
      setIsLoadingCode(false);
    }
  }

  return (
    <SafeAreaView style={styles.callToAction}>
      <ScrollView style={styles.callToActionSub} showsVerticalScrollIndicator={false}>

        {/* Date Lock Form */}
        <Pressable style={styles.actionButton} onPress={handleChange2}>
          <Text style={styles.actionButtonTxt}>Date Lock</Text>
        </Pressable>
        <View style={selectedStyle2}>
          <Text style={styles.formLabel}>ACCOUNT NUMBER</Text>
          <TextInput
            style={styles.formInput}
            value={receiver}
            onChangeText={setReceiver}
            placeholder="Enter account number"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>AMOUNT</Text>
          <TextInput
            style={styles.formInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
         
          <Text style={styles.formLabel}>DATE</Text>
          <TextInput
            style={styles.formInput}
            value={confirmation}
            onChangeText={setConfirmation}
            placeholder="Enter date for withdrawal"
          />
          <Pressable
            style={[styles.formButton, isLoadingDate && styles.disabledButton]}
            onPress={payDate}
            disabled={isLoadingDate}
          >
            <Text style={styles.formButtonTxt}>
              {isLoadingDate ? 'SUBMITTING...' : 'SUBMIT'}
            </Text>
          </Pressable>
        </View>

        {/* Code Lock Form */}
        <Pressable style={styles.actionButton} onPress={handleChange}>
          <Text style={styles.actionButtonTxt}>Code Lock</Text>
        </Pressable>
        <View style={selectedStyle}>
          <Text style={styles.formLabel}>ACCOUNT NUMBER</Text>
          <TextInput
            style={styles.formInput}
            value={receiverCode}
            onChangeText={setReceiverCode}
            placeholder="Enter account number"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>AMOUNT</Text>
          <TextInput
            style={styles.formInput}
            value={amountCode}
            onChangeText={setAmountCode}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <Pressable
            style={[styles.formButton, isLoadingCode && styles.disabledButton]}
            onPress={payCode}
            disabled={isLoadingCode}
          >
            <Text style={styles.formButtonTxt}>
              {isLoadingCode ? 'REQUESTING...' : 'REQUEST CODE'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default deffered

const styles = StyleSheet.create({
  none: {
    display: "none"
  },
  callToAction: {
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  callToActionSub: {
    width: "100%"
  },
  actionButton: {
    marginVertical: 10,
    width: "90%",
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "orange",
    borderWidth: 2
  },
  actionButtonTxt: {
    fontWeight: "700",
    color: "black"
  },
  formInput: {
    borderColor: "black",
    borderWidth: 3,
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5
  },
  form: {
    backgroundColor: "white",
    width: "90%",
    maxHeight: 450,
    flexDirection: "column",
    padding: 8,
    justifyContent: "center",
    borderRadius: 10
  },
  formLabel: {
    marginVertical: 5,
    fontWeight: "700"
  },
  formButton: {
    height: 50,
    maxWidth: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 5
  },
  formButtonTxt: {
    color: "black",
    fontWeight: "700"
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7
  }
})