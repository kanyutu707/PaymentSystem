import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const account = () => {

    type User={
    firstName: string;
    email: string;
    lastName: string;
    idNo: Number;
    accountNo: string;
    phoneNo: string
  }

  const router = useRouter();
  const [user, setUser]=useState<User | null>(null);

  const getUser=async()=>{
    try {
      const jsonValue=await AsyncStorage.getItem('userdetails');
      return jsonValue!=null?JSON.parse(jsonValue):null;
    } catch (error) {
      console.error('Failed to load user data:', error);
      return null;
    }
  }
 useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);
  
  const clearSessions=()=>{
    AsyncStorage.clear();
    router.navigate('../signin')
  }
  return (
    
    <SafeAreaView style={styles.container}>
      {user?(<>
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
   
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require("../../assets/images/human.jpg")} 
              style={styles.avatar}
            />
            <View style={styles.avatarBorder} />
          </View>
          <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
          <View style={styles.goldBadge}>
            <Text style={styles.goldBadgeText}>GOLD MEMBER</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.iconPlaceholder}>📱</View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>{user.phoneNo}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <View style={styles.iconPlaceholder}>✉️</View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email Address</Text>
              <Text style={styles.detailValue}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <View style={styles.iconPlaceholder}>🏦</View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Account Number</Text>
              <Text style={styles.detailValue}>{user.accountNo}</Text>
            </View>
          </View>
        </View>

        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>🗺️</Text>
            <Text style={styles.mapText}>Interactive Map</Text>
            <Text style={styles.mapSubtext}>Tap to view your location</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={clearSessions} 
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </ScrollView>
      
      </>):(<Text>Loading user data ...</Text>)}
      
    </SafeAreaView>
  )
}

export default account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ff8c00',
  },
  avatarBorder: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 68,
    borderWidth: 2,
    borderColor: '#ff8c00',
    opacity: 0.3,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  goldBadge: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goldBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 1,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#ff8c00',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ff8c00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    fontSize: 20,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
  mapSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ff8c00',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ff8c00',
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 40,
    marginBottom: 12,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  logoutButton: {
    marginHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#ff8c00',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
})