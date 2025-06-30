import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signin = () => {
  const apiUrl = Constants?.expoConfig?.extra?.apiUrl;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signinform = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);

    if (!apiUrl) {
      Alert.alert('Error', 'Unable to connect to the server.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/signin`, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.status === 200) {
        await AsyncStorage.setItem('token', result.token);
        await getUser(result.token);
        router.navigate('./(tabs)');
      } else {
        Alert.alert('Sign In Failed', result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (authToken: string) => {
    try {
      const response = await fetch(`${apiUrl}/user/loggedin`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });

      if (response.ok) {
        const result = await response.json();
        await AsyncStorage.setItem('userdetails', JSON.stringify(result));
      } else {
        console.error("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("User details fetch error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>🏦</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Secure sign-in to Cental Bank</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>SIGN IN</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. user@example.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
          </View>

          <Pressable
            onPress={signinform}
            style={({ pressed }) => [
              styles.button,
              isLoading && styles.buttonDisabled,
              pressed && !isLoading && styles.buttonPressed,
            ]}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </Pressable>

          <TouchableOpacity
            onPress={() => router.navigate('./signup')}
            disabled={isLoading}
            activeOpacity={0.7}
            style={styles.footerLink}
          >
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.footerHighlight}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff8c00',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  logoText: {
    fontSize: 34,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    borderWidth: 2,
    borderColor: '#ff8c00',
    elevation: 4,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  button: {
    backgroundColor: '#ff8c00',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
  },
  footerLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerHighlight: {
    fontWeight: '700',
    color: '#ff8c00',
  },
});
