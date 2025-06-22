import { TouchableOpacity, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const current = () => {

  const apiUrl = Constants?.expoConfig?.extra?.apiUrl;

  const [paymenttime, setPaymentTime] = useState('CURRENT');

  const [amountCode, setAmountCode] = useState('');
  const [receiverCode, setReceiverCode] = useState('');
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [isCompleted, setIsCompleted]=useState(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStyle, setselectedStyle] = useState<any>(styles.none);
  const handleChange = () => {
    setIsOpen(!isOpen);
    handleStyle();
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

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value ?? null;
    } catch (e) {
      console.error('Error fetching token:', e);
      return null;
    }
  };

  const handleStyle = () => {
    if (isOpen) {
      setselectedStyle(styles.none);
    } else {
      setselectedStyle(styles.form);
    }
  }

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [writtenText, setWrittenText] = useState<string>('Tap To Pay');

  const handleTextChangeText = () => {
    setIsChanged(!isChanged);
    changeText();
  }
  const changeText = () => {
    if (isChanged) {
      setWrittenText('Establishing connection ...');
    }
    else {
      setWrittenText('Tap To Pay')
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
          paymenttime,
          isCompleted
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
    <View style={styles.callToAction}>
      <TouchableOpacity style={styles.actionButton} onPress={handleTextChangeText}><MaterialCommunityIcons name="gesture-tap-button" size={24} color="orange" /><Text style={styles.actionButtonTxt}>{writtenText}</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={handleChange}><MaterialIcons name="question-answer" size={24} color="orange" /><Text style={styles.actionButtonTxt}>ACCOUNT NUMBER</Text></TouchableOpacity>
      <View style={selectedStyle} >
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
    </View>
  )
}

export default current

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
    fontWeight: 700
  },
  formInput: {
    marginVertical: 8,
    borderColor: "orange",
    borderWidth: 2
  },
  form: {
    backgroundColor: "white",
    width: "90%",
    height: 250,
    flexDirection: "column",
    padding: 8,
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 4,

  },
  formLabel: {
    marginVertical: 5,
    fontWeight: 700
  },
  formButton: {
    height: 50,
    width: 100,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5
  },
  formButtonTxt: {
    color: "black",
    fontWeight: 700
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7
  }
})