import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownMenu from '../components/DropDownMenu';
import MenuOption from '../components/MenuOption';

interface receivedItem {
  id: number,
  accountNo: string;
  amount: string | number;
}

const Received: React.FC = () => {

  const [visible, setVisible] = useState(false);
  const [receivedData, setReceivedData] = useState<receivedItem[]>([]);
  const [code, setcode] = useState('');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getreceived();
  }, [])

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

  const getreceived = async (): Promise<void> => {
    const token = await getData();
    const response = await fetch(`${apiUrl}/payment/getByReceiverProcessing`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json();
    if (response.status == 200) {
      setReceivedData(result);
    }
    else {
      console.error("User not selected")
    }
  }

  const handleItemPress = (id: number) => {
    setSelectedId(id);
    setVisible(true);
  }

  const checkoutReceiver = async () => {
    const token = await getData();
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/payment/confirmbyrecipient`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: Number(selectedId),
          code: code
        })
      });
      
      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Code received successfully: ${result.code || 'Check your id'}`);
        setSelectedId(0);
        setcode('');
        setVisible(false);
        // Refresh the data after successful submission
        getreceived();
      } else {
        Alert.alert('Error', result.message || 'Failed to receive code lock');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Code lock receipt error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.searchcontainer}>
      <TextInput style={styles.searchbar} placeholder='input your search query ...'></TextInput>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Render the list of received items */}
        {receivedData.length === 0 ? (
          <Text style={styles.noDataText}>Sorry, no data found</Text>
        ) : (
          receivedData.map((singlereceived: receivedItem, index: number) => (
            <Pressable 
              key={index} 
              style={styles.singlereceived} 
              onPress={() => handleItemPress(singlereceived.id)}
            >
              <View style={styles.singlereceivedTop}>
                <Text style={styles.singlereceivedTopAcc}>{singlereceived.accountNo}</Text>
                <Text style={styles.singlereceivedTopAmt}>{singlereceived.amount}</Text>
              </View>
              <Text style={styles.singlereceivedBottom}>14/3/2020</Text>
            </Pressable>
          ))
        )}

        {/* Modal/Dropdown for entering receiver code */}
        <DropdownMenu
          visible={visible}
          handleOpen={() => setVisible(true)}
          handleClose={() => setVisible(false)}
          trigger={<View />} // Empty trigger since we're controlling visibility manually
        >
          <MenuOption onSelect={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>INPUT RECEIVER CODE</Text>
              <TextInput
                style={styles.codeInput}
                placeholder='Enter your code'
                value={code}
                onChangeText={setcode}
                autoCapitalize="none"
                placeholderTextColor="#999999"
              />
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={() => {
                    setVisible(false);
                    setcode('');
                    setSelectedId(0);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable 
                  style={[styles.button, styles.submitButton]} 
                  onPress={checkoutReceiver}
                  disabled={isLoading || !code}
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
  )
}

export default Received

const styles = StyleSheet.create({
  searchcontainer: {
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "white"
  },
  searchbar: {
    backgroundColor: "white",
    width: "100%",
    height: 55,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  singlereceived: {
    backgroundColor: "white",
    width: "98%",
    height: 70,
    borderRadius: 6,
    marginVertical: 7,
    flexDirection: "column",
    borderColor: "orange",
    borderWidth: 2,
    padding: 2,
    justifyContent: "space-evenly"
  },
  singlereceivedTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6
  },
  singlereceivedTopAcc: {
    fontSize: 20,
    fontWeight: "700"
  },
  singlereceivedTopAmt: {
    fontSize: 19,
    fontWeight: "500"
  },
  singlereceivedBottom: {
    fontSize: 13,
    fontWeight: "800",
    color: "orange",
    paddingLeft: 6
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    minWidth: 300
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  submitButton: {
    backgroundColor: 'orange'
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600'
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600'
  }
})