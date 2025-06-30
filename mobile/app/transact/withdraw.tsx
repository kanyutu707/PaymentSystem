import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { height: screenHeight } = Dimensions.get('window');

const Withdraw: React.FC = () => {
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

  // Modal visibility states
  const [showMpesaOptions, setShowMpesaOptions] = useState<boolean>(false);
  const [showStripeOptions, setShowStripeOptions] = useState<boolean>(false);
  const [showPaypalOptions, setShowPaypalOptions] = useState<boolean>(false);
  const [showBankOptions, setShowBankOptions] = useState<boolean>(false);
  const [showAgentOptions, setShowAgentOptions] = useState<boolean>(false);

  // Slide animations for modals
  const mpesaSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const stripeSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const paypalSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const bankSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const agentSlideAnim = useRef(new Animated.Value(screenHeight)).current;

  // Form state
  const [amount, setAmount] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [transactionType, setTransactionType] = useState<string>('WITHDRAWAL');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const animateSlideUp = (animValue: Animated.Value, show: boolean) => {
    Animated.timing(animValue, {
      toValue: show ? 0 : screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close all modals helper
  const closeAllModals = () => {
    setShowMpesaOptions(false);
    setShowStripeOptions(false);
    setShowPaypalOptions(false);
    setShowBankOptions(false);
    setShowAgentOptions(false);
    setPlatform('');
    setAmount('');
    setSubmissionError(null);
  };

  const openPaymentModal = (
    paymentType: string,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setPlatform(paymentType);
    setSubmissionError(null);
    setAmount('');
    setShowModal(true);
  };

  useEffect(() => {
    animateSlideUp(mpesaSlideAnim, showMpesaOptions);
  }, [showMpesaOptions]);

  useEffect(() => {
    animateSlideUp(stripeSlideAnim, showStripeOptions);
  }, [showStripeOptions]);

  useEffect(() => {
    animateSlideUp(paypalSlideAnim, showPaypalOptions);
  }, [showPaypalOptions]);

  useEffect(() => {
    animateSlideUp(bankSlideAnim, showBankOptions);
  }, [showBankOptions]);

  useEffect(() => {
    animateSlideUp(agentSlideAnim, showAgentOptions);
  }, [showAgentOptions]);

  const validateDeposit = () => {
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    return true;
  };

  const deposit = async () => {
    if (!validateDeposit()) return;

    const token = await getData();
    if (!token) {
      setSubmissionError('User not authenticated.');
      return;
    }

    setIsLoading(true);
    setSubmissionError(null);

    try {
      const response = await fetch(`${apiUrl}/transaction/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          platform,
          transactiontype: transactionType,
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
        Alert.alert('Success', 'Withdrawal successful');
        closeAllModals();
      } else {
        setSubmissionError(result.message || 'Failed to process withdrawal');
      }
    } catch (error) {
      setSubmissionError('Network error. Please try again.');
      console.error('Deposit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = (
    animValue: Animated.Value,
    onClose: () => void,
    title: string
  ) => (
    <Animated.View
      style={[
        styles.modalOverlay,
        {
          transform: [{ translateY: animValue }],
        },
      ]}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title} Payment</Text>
          <AntDesign name="closecircle" size={24} color="orange" onPress={onClose} />
        </View>

        <Text style={styles.transferLabel}>AMOUNT</Text>
        <TextInput
          style={styles.transferInput}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          editable={!isLoading}
        />

        {submissionError ? (
          <Text style={styles.errorText}>{submissionError}</Text>
        ) : null}

        <Pressable
          style={[styles.transferFormBtn, isLoading && styles.disabledBtn]}
          onPress={deposit}
          disabled={isLoading}
        >
          <Text style={styles.transferFormBtnTxt}>
            {isLoading ? 'PROCESSING...' : 'PAY'}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.deposit}>
        <Text style={styles.header}>SELECT DEPOSIT METHOD</Text>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => openPaymentModal('MPESA', setShowMpesaOptions)}
            style={styles.card}
          >
            <Image style={styles.logo} source={require('../../assets/images/mpesa.jpg')} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => openPaymentModal('STRIPE', setShowStripeOptions)}
          >
            <Image style={styles.logo} source={require('../../assets/images/stripe.jpg')} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => openPaymentModal('PAYPAL', setShowPaypalOptions)}
          >
            <Image style={styles.logo} source={require('../../assets/images/paypal.jpg')} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => openPaymentModal('BANK', setShowBankOptions)}
          >
            <Image style={styles.logo} source={require('../../assets/images/bank.jpg')} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => openPaymentModal('AGENT', setShowAgentOptions)}
          >
            <Image style={styles.logo} source={require('../../assets/images/agent.jpg')} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showMpesaOptions && renderForm(mpesaSlideAnim, () => setShowMpesaOptions(false), 'M-Pesa')}
      {showStripeOptions &&
        renderForm(stripeSlideAnim, () => setShowStripeOptions(false), 'Stripe')}
      {showPaypalOptions &&
        renderForm(paypalSlideAnim, () => setShowPaypalOptions(false), 'PayPal')}
      {showBankOptions && renderForm(bankSlideAnim, () => setShowBankOptions(false), 'Bank')}
      {showAgentOptions && renderForm(agentSlideAnim, () => setShowAgentOptions(false), 'Agent')}
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 17,
    fontWeight: '800',
    backgroundColor: 'white',
    padding: 4,
    margin: 10,
  },
  deposit: {
    flex: 1,
    width: '100%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  transferFormBtn: {
    backgroundColor: 'orange',
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  disabledBtn: {
    backgroundColor: '#cccccc',
  },
  transferFormBtnTxt: {
    fontWeight: '800',
    color: 'white',
    fontSize: 16,
  },
  transferLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  transferInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    padding: '2%',
    justifyContent: 'space-around',
  },
  card: {
    margin: '2%',
    backgroundColor: 'white',
    width: '46%',
    borderRadius: 5,
    padding: '1%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: 'orange',
    borderWidth: 2,
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontWeight: '600',
  },
});
