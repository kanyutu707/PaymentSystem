import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoSection}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>🔐</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subtitleText}>Sign in to your account</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>SIGN IN</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Enter your email' 
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Enter your password' 
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        <Pressable 
          onPress={() => router.navigate("./(tabs)")} 
          style={({ pressed }) => [
            styles.signinButton,
            pressed && styles.signinButtonPressed
          ]}
        >
          <Text style={styles.signinButtonText}>SIGN IN</Text>
        </Pressable>

        <TouchableOpacity 
          style={styles.registerContainer} 
          onPress={() => router.navigate("./signup")}
          activeOpacity={0.7}
        >
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default signin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff8c00',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 35,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ff8c00',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#ff8c00',
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: '#ff8c00',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  textInput: {
    height: 55,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  signinButton: {
    backgroundColor: '#ff8c00',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  signinButtonPressed: {
    backgroundColor: '#e67e00',
    transform: [{ scale: 0.98 }],
  },
  signinButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  registerText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
  registerLink: {
    fontSize: 15,
    color: '#ff8c00',
    fontWeight: '700',
  },
})