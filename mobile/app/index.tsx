import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

const index = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/index.jpg")}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Logo & Brand */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoInitials}>CP</Text>
          </View>
          <Text style={styles.bankName}>CENTAL BANK</Text>
          <Text style={styles.tagline}>Secure. Simple. Smart.</Text>
        </View>

        {/* Tagline / Feature Intro */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>All Your Banking in One App</Text>
          <Text style={styles.heroSubtitle}>
            Transfer money, pay bills, and manage your finances — all from your phone.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionSection}>
          <Pressable
            onPress={() => router.navigate('./signin')}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>SIGN IN</Text>
          </Pressable>

          <Pressable
            onPress={() => router.navigate('./signup')}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>CREATE ACCOUNT</Text>
          </Pressable>

          <TouchableOpacity style={styles.guestButton} activeOpacity={0.7}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 2,
  },
  content: {
    flex: 1,
    zIndex: 3,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff8c00',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoInitials: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  bankName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
    fontStyle: 'italic',
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  primaryButton: {
    backgroundColor: '#ff8c00',
    width: width * 0.85,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff8c00',
    width: width * 0.85,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  guestButton: {
    paddingVertical: 8,
  },
  guestButtonText: {
    fontSize: 14,
    color: '#ddd',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ff8c00',
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
  },
});
