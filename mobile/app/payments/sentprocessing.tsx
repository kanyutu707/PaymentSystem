import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownMenu from '../components/DropDownMenu';
import MenuOption from '../components/MenuOption';

interface SentItem {
  id: number;
  accountNo: string;
  amount: string | number;
}

const SentProcessing: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [sentData, setSentData] = useState<SentItem[]>([]);
  const [code, setCode] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = Constants?.expoConfig?.extra?.apiUrl;

  useEffect(() => {
    getSent();
  }, []);

  const getData = async (): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value ?? null;
    } catch (e) {
      console.error('Error fetching token:', e);
      return null;
    }
  };

  const getSent = async (): Promise<void> => {
    const token = await getData();
    try {
      const response = await fetch(`${apiUrl}/payment/getBySenderProcessing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (response.ok && Array.isArray(result)) {
        setSentData(result);
      } else {
        console.error('Failed to fetch sent data');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleItemPress = (id: number) => {
    setSelectedId(id);
    setVisible(true);
  };

  const checkoutSender = async () => {
    if (!selectedId) {
      Alert.alert('Error', 'No item selected');
      return;
    }

    setIsLoading(true);
    const token = await getData();

    try {
      const response = await fetch(`${apiUrl}/payment/confirmbysender`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: selectedId,
          code: code.trim(),
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (response.ok) {
        Alert.alert('Success', `Code sent successfully: ${result?.code || 'Check your ID'}`);
        setSelectedId(null);
        setCode('');
        setVisible(false);
        getSent();
      } else {
        Alert.alert('Error', result?.message || 'Failed to send code lock');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Code lock send error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.searchcontainer}>
      <TextInput
        style={styles.searchbar}
        placeholder="Input your search query ..."
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {sentData.length === 0 ? (
          <Text style={styles.noDataText}>Sorry, no data found</Text>
        ) : (
          sentData.map((item) => (
            <Pressable
              key={item.id}
              style={styles.singlereceived}
              onPress={() => handleItemPress(item.id)}
            >
              <View style={styles.singlereceivedTop}>
                <Text style={styles.singlereceivedTopAcc}>{item.accountNo}</Text>
                <Text style={styles.singlereceivedTopAmt}>{item.amount}</Text>
              </View>
              <Text style={styles.singlereceivedBottom}>14/3/2020</Text>
            </Pressable>
          ))
        )}

        <DropdownMenu
          visible={visible}
          handleOpen={() => setVisible(true)}
          handleClose={() => setVisible(false)}
          fullWidth
          trigger={<View />}
        >
          <MenuOption onSelect={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>INPUT RECEIVER CODE</Text>
              <TextInput
                style={styles.codeInput}
                placeholder="Enter your code"
                value={code}
                onChangeText={setCode}
                autoCapitalize="none"
                placeholderTextColor="#999999"
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setVisible(false);
                    setCode('');
                    setSelectedId(null);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.submitButton]}
                  onPress={checkoutSender}
                  disabled={isLoading || !code.trim()}
                >
                  <Text style={styles.submitButtonText}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </MenuOption>
        </DropdownMenu>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SentProcessing;

const styles = StyleSheet.create({
  searchcontainer: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  searchbar: {
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  singlereceived: {
    backgroundColor: 'white',
    width: '98%',
    height: 70,
    borderRadius: 6,
    marginVertical: 7,
    flexDirection: 'column',
    borderColor: 'orange',
    borderWidth: 2,
    padding: 2,
    justifyContent: 'space-evenly',
  },
  singlereceivedTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  singlereceivedTopAcc: {
    fontSize: 20,
    fontWeight: '700',
  },
  singlereceivedTopAmt: {
    fontSize: 19,
    fontWeight: '500',
  },
  singlereceivedBottom: {
    fontSize: 13,
    fontWeight: '800',
    color: 'orange',
    paddingLeft: 6,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: 'orange',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
