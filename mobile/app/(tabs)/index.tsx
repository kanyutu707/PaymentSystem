import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export default function Index() {
  const apiUrl = Constants?.expoConfig?.extra?.apiUrl;
  const [deposit, setDeposit] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);
  const [received, setReceived] = useState(0);
  const [sent, setSent] = useState(0);
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState(0);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value ?? null;
    } catch (e) {
      console.error('Error fetching token:', e);
      return null;
    }
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userdetails');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Failed to load user data:', error);
      return null;
    }
  }

  const fetchUser = async () => {
    const userData = await getUser();
    setUser(userData.accountNo);
  };

  const getDeposits = async () => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/money/deposits`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    setDeposit(result);
  };

  const getWithdrawals = async () => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/money/withdrawals`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    setWithdrawal(result);
  };

  const getReceived = async () => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/money/received`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    setReceived(result);
  };

  const getSent = async () => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/money/sent`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    setSent(result);
  };

  const getBalance = async () => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/money/balance`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    setBalance(result);
  };

  useEffect(() => {
    if (!apiUrl) return;
    getDeposits();
    getWithdrawals();
    getSent();
    getReceived();
    fetchUser();
    getBalance();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.indexbal}>
          <View style={styles.balanceContent}>
            <View style={styles.indexSecondCol}>
              <Text style={styles.indexBalTitle}>Total Balance</Text>
              <Text style={styles.indexBalNum}>$ {balance}</Text>
              <Text style={styles.balanceSubtext}>Available balance</Text>
            </View>
            <View style={styles.balanceIconContainer}>
              <MaterialIcons name="account-balance-wallet" size={45} color="orange" />
            </View>
          </View>
          <View style={styles.balanceGradientOverlay} />
        </View>

        {/* Account Info */}
        <View style={styles.accountnumberholder}>
          <View style={styles.accountHeader}>
            <View style={styles.accountIconCircle}>
              <MaterialIcons name="credit-card" size={22} color="white" />
            </View>
            <Text style={styles.accountnumbertitle}>Account Number</Text>
          </View>
          <Text style={styles.accountnumber}>{user}</Text>
          <View style={styles.accountTypeBadge}>
            <MaterialCommunityIcons name="star" size={16} color="orange" />
            <Text style={styles.accountType}>PREMIUM ACCOUNT</Text>
          </View>
        </View>

        {/* Transaction Summary */}
        <View style={styles.extras}>
          <View style={styles.extrarow}>
            <View style={[styles.extra, styles.depositCard]}>
              <View style={styles.extraHeader}>
                <View style={styles.iconCircleOrange}>
                  <Ionicons name="add-circle" size={24} color="white" />
                </View>
                <Text style={styles.extraTitle}>Deposits</Text>
              </View>
              <Text style={styles.extraValue}>{deposit}</Text>
              <Text style={styles.extraDate}>Last: 15/2/2020</Text>
            </View>

            <View style={[styles.extra, styles.withdrawCard]}>
              <View style={styles.extraHeader}>
                <View style={styles.iconCircleBlack}>
                  <MaterialCommunityIcons name="bank-minus" size={24} color="white" />
                </View>
                <Text style={styles.extraTitle}>Withdrawals</Text>
              </View>
              <Text style={styles.extraValue}>{withdrawal}</Text>
              <Text style={styles.extraDate}>Last: 15/2/2020</Text>
            </View>
          </View>

          <View style={styles.extrarow}>
            <View style={[styles.extra, styles.receivedCard]}>
              <View style={styles.extraHeader}>
                <View style={styles.iconCircleOrange}>
                  <FontAwesome5 name="arrow-down" size={20} color="white" />
                </View>
                <Text style={styles.extraTitle}>Received</Text>
              </View>
              <Text style={styles.extraValue}>{received}</Text>
              <Text style={styles.extraDate}>Last: 15/2/2020</Text>
            </View>

            <View style={[styles.extra, styles.sentCard]}>
              <View style={styles.extraHeader}>
                <View style={styles.iconCircleBlack}>
                  <FontAwesome5 name="arrow-up" size={20} color="white" />
                </View>
                <Text style={styles.extraTitle}>Sent</Text>
              </View>
              <Text style={styles.extraValue}>{sent}</Text>
              <Text style={styles.extraDate}>Last: 15/2/2020</Text>
            </View>
          </View>
        </View>

        {/* Membership */}
        <View style={styles.membershipcontainer}>
          <View style={styles.membershipContent}>
            <View style={styles.membershipInfo}>
              <Text style={styles.membershiptitle}>Membership Status</Text>
              <View style={styles.goldBadge}>
                <MaterialCommunityIcons name="crown" size={20} color="white" />
                <Text style={styles.membership}>GOLD MEMBER</Text>
              </View>
            </View>
            <View style={styles.membershipIconContainer}>
              <MaterialCommunityIcons name="star-circle" size={55} color="orange" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  indexbal: {
    height: 160,
    width: '100%',
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: 'black',
    elevation: 12,
    overflow: 'hidden',
  },
  balanceContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 24,
    zIndex: 2,
  },
  balanceGradientOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  indexSecondCol: { flex: 1 },
  indexBalTitle: { fontSize: 18, fontWeight: '600', color: 'white', marginBottom: 8, opacity: 0.9 },
  indexBalNum: { fontSize: 36, fontWeight: '800', color: 'orange', marginBottom: 6 },
  balanceSubtext: { fontSize: 15, color: 'white', fontWeight: '500', opacity: 0.8 },
  balanceIconContainer: { backgroundColor: 'white', borderRadius: 60, padding: 18, elevation: 8 },
  accountnumberholder: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginBottom: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'orange',
    elevation: 8,
  },
  accountHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  accountIconCircle: { backgroundColor: 'orange', borderRadius: 25, padding: 12, marginRight: 16, elevation: 4 },
  accountnumbertitle: { fontSize: 16, color: "black", fontWeight: '700' },
  accountnumber: { fontSize: 22, color: "black", fontWeight: '800', letterSpacing: 2, marginBottom: 16 },
  accountTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: 'flex-start',
    elevation: 4,
  },
  accountType: { fontSize: 13, color: "white", fontWeight: '800', marginLeft: 6 },
  extras: { width: "100%", marginBottom: 24 },
  extrarow: { flexDirection: "row", justifyContent: 'space-between', marginBottom: 20 },
  extra: { backgroundColor: "white", width: "48%", borderRadius: 20, padding: 20, elevation: 8 },
  depositCard: { borderWidth: 2, borderColor: 'orange' },
  withdrawCard: { borderWidth: 2, borderColor: 'black' },
  receivedCard: { borderWidth: 2, borderColor: 'orange' },
  sentCard: { borderWidth: 2, borderColor: 'black' },
  extraHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconCircleOrange: { backgroundColor: 'orange', borderRadius: 30, padding: 10, marginRight: 12, elevation: 4 },
  iconCircleBlack: { backgroundColor: 'black', borderRadius: 30, padding: 10, marginRight: 12, elevation: 4 },
  extraTitle: { fontSize: 15, fontWeight: '700', color: 'black' },
  extraValue: { fontSize: 26, fontWeight: '800', color: 'black', marginBottom: 8 },
  extraDate: { fontSize: 13, fontWeight: '600', color: "orange" },
  membershipcontainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: 'orange',
    elevation: 10,
  },
  membershipContent: { flexDirection: "row", justifyContent: 'space-between', alignItems: "center" },
  membershipInfo: { flex: 1 },
  membershiptitle: { fontSize: 18, fontWeight: '700', color: "black", marginBottom: 16 },
  goldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
    elevation: 6,
  },
  membership: { fontSize: 15, fontWeight: '800', color: 'white', marginLeft: 8 },
  membershipIconContainer: { backgroundColor: 'black', borderRadius: 40, padding: 12, elevation: 8 },
});
