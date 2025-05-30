import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';

const transact = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        <TouchableOpacity 
          style={styles.transactCard} 
          onPress={() => router.navigate('../transact/deposit')}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>💰</Text>
            </View>
            <Text style={styles.transactCardText}>Deposit</Text>
          </View>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.transactCard} 
          onPress={() => router.navigate('../transact/withdraw')}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>💸</Text>
            </View>
            <Text style={styles.transactCardText}>Withdraw</Text>
          </View>
          <Entypo name="chevron-right" size={28} color="orange" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default transact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor:"white"
  },

  transactCard: {
    backgroundColor: "white",
    height: 80,
    width: "100%",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "orange",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  
  iconText: {
    fontSize: 24,
  },
  
  transactCardText: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    flex: 1,
  },
})