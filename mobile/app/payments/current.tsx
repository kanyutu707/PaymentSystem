import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Current = () => {
  const apiUrl = Constants?.expoConfig?.extra?.apiUrl;

  const [paymenttime] = useState('CURRENT');
  const [amountCode, setAmountCode] = useState('');
  const [receiverCode, setReceiverCode] = useState('');
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [isCompleted] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateCodeForm = () => {
    if (!receiverCode.trim()) {
      setErrorMessage('Please enter account number');
      return false;
    }
    if (!amountCode.trim() || isNaN(Number(amountCode)) || Number(amountCode) <= 0) {
      setErrorMessage('Please enter a valid amount');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value ?? null;
    } catch (e) {
      console.error('Error fetching token:', e);
      return null;
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
    setErrorMessage(null);
  };

  const [isChanged, setIsChanged] = useState(false);
  const [writtenText, setWrittenText] = useState('Tap To Pay');

  const handleTextChangeText = () => {
    setIsChanged(!isChanged);
    if (!isChanged) {
      setWrittenText('Establishing connection ...');
    } else {
      setWrittenText('Tap To Pay');
    }
  };

  const payCode = async () => {
    if (!validateCodeForm()) return;

    const token = await getData();
    if (!token) {
      setErrorMessage('User not authenticated.');
      return;
    }

    setIsLoadingCode(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${apiUrl}/payment/createByAccountNoCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amountCode),
          receiver: { accountNo: receiverCode },
          paymenttime,
          isCompleted,
        }),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }

      if (response.ok) {
        setConfirmation(result.code || 'Check your email');
        // You could also display confirmation in the UI if you want.
        // For now, reset form and close it:
        setAmountCode('');
        setReceiverCode('');
        setIsOpen(false);
        setErrorMessage(null);
        alert(`Success! Code lock created! Your code: ${result.code || 'Check your email'}`);
      } else {
        setErrorMessage(result.message || 'Failed to create code lock payment');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      console.error('Code lock payment error:', error);
    } finally {
      setIsLoadingCode(false);
    }
  };

  return (
    <View style={styles.callToAction}>
      <TouchableOpacity style={styles.actionButton} onPress={handleTextChangeText}>
        <MaterialCommunityIcons name="gesture-tap-button" size={24} color="orange" />
        <Text style={styles.actionButtonTxt}>{writtenText}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={toggleForm}>
        <MaterialIcons name="question-answer" size={24} color="orange" />
        <Text style={styles.actionButtonTxt}>ACCOUNT NUMBER</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.form}>
          <Text style={styles.formLabel}>ACCOUNT NUMBER</Text>
          <TextInput
            style={styles.formInput}
            value={receiverCode}
            onChangeText={setReceiverCode}
            placeholder="Enter account number"
            keyboardType="numeric"
            editable={!isLoadingCode}
          />
          <Text style={styles.formLabel}>AMOUNT</Text>
          <TextInput
            style={styles.formInput}
            value={amountCode}
            onChangeText={setAmountCode}
            placeholder="Enter amount"
            keyboardType="numeric"
            editable={!isLoadingCode}
          />
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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
      )}
    </View>
  );
};

export default Current;

const styles = StyleSheet.create({
  none: {
    display: 'none',
  },
  callToAction: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  actionButton: {
    marginVertical: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'orange',
    borderWidth: 2,
    flexDirection: 'row',
    gap: 8,
  },
  actionButtonTxt: {
    fontWeight: '700',
  },
  formInput: {
    marginVertical: 8,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
  },
  form: {
    backgroundColor: 'white',
    width: '90%',
    height: 250,
    flexDirection: 'column',
    padding: 8,
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 4,
    elevation: 2,
  },
  formLabel: {
    marginVertical: 5,
    fontWeight: '700',
    fontSize: 16,
  },
  formButton: {
    height: 50,
    width: 140,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 6,
  },
  formButtonTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
});
