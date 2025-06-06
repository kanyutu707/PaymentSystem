import { Pressable, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

const index = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/images/index.jpg")} style={styles.backgroundImage} />
            
            <View style={styles.overlay} />
            
            <View style={styles.content}>
                <View style={styles.logoSection}>
                    <View style={styles.brandContainer}>
                        <Text style={styles.brandPrimary}>CENTAL</Text>
                        <Text style={styles.brandSecondary}>PAYMENTS</Text>
                    </View>
                    <View style={styles.taglineContainer}>
                        <Text style={styles.tagline}>Your trusted financial partner</Text>
                    </View>
                </View>

                <View style={styles.heroSection}>
                    <View style={styles.heroCard}>
                        <Text style={styles.heroTitle}>Manage Your Finances</Text>
                        <Text style={styles.heroSubtitle}>
                            Handle payments and transactions without stress. 
                            Secure, fast, and reliable financial management at your fingertips.
                        </Text>
                    </View>
                </View>

                <View style={styles.actionSection}>
                    <Pressable 
                        onPress={() => router.navigate("./signin")} 
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.buttonPressed
                        ]}
                    >
                        <Text style={styles.primaryButtonText}>SIGN IN</Text>
                    </Pressable>
                    
                    <Pressable 
                        onPress={() => router.navigate("./signup")} 
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.buttonPressed
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
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    backgroundImage: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        opacity: 0.85,
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
        paddingTop: 60,
    },
    brandContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    brandPrimary: {
        fontSize: 42,
        fontWeight: '800',
        color: '#000000',
        letterSpacing: 3,
        textAlign: 'center',
        marginBottom: 5,
    },
    brandSecondary: {
        fontSize: 36,
        fontWeight: '800',
        color: '#ff8c00',
        letterSpacing: 2,
        textAlign: 'center',
    },
    taglineContainer: {
        paddingHorizontal: 20,
    },
    tagline: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        fontWeight: '500',
        fontStyle: 'italic',
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    heroCard: {
    
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
      

    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 15,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '400',
    },
    actionSection: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#ff8c00',
        width: width * 0.8,
        height: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#ff8c00',
        width: width * 0.8,
        height: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    guestButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    buttonPressed: {
        transform: [{ scale: 0.97 }],
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 1,
    },
    secondaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ff8c00',
        letterSpacing: 1,
    },
    guestButtonText: {
        fontSize: 15,
        color: '#666666',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
})