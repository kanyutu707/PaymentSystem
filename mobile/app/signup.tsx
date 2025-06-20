import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import Constants from 'expo-constants';

const signup = () => {
    const apiUrl = Constants?.expoConfig?.extra?.apiUrl;

    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [idNo, setIdNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupform = async () => {

        if (!apiUrl) {
            return "sorry problem contacting the server";
        }

        try {
            const response = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ firstName, lastName, idNo, email, password })
            })
            const result = await response.json();
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoText}>👤</Text>
                    </View>
                    <Text style={styles.welcomeText}>Create Account</Text>
                    <Text style={styles.subtitleText}>Join us today</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.formHeader}>SIGN UP</Text>

                    <View style={styles.inputRow}>
                        <View style={styles.halfInputContainer}>
                            <Text style={styles.inputLabel}>First Name</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    placeholder='First name'
                                    style={styles.textInput}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    autoCapitalize="words"
                                    placeholderTextColor="#999999"
                                />
                            </View>
                        </View>

                        <View style={styles.halfInputContainer}>
                            <Text style={styles.inputLabel}>Last Name</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    placeholder='Last name'
                                    style={styles.textInput}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    autoCapitalize="words"
                                    placeholderTextColor="#999999"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Identification Number</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder='Enter your ID number'
                                style={styles.textInput}
                                value={idNo}
                                onChangeText={setIdNo}
                                keyboardType="numeric"
                                placeholderTextColor="#999999"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <View style={styles.inputWrapper}>
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
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder='Create a password'
                                style={styles.textInput}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                placeholderTextColor="#999999"
                            />
                        </View>
                    </View>

                    <Pressable
                        onPress={signupform}
                        style={({ pressed }) => [
                            styles.signupButton,
                            pressed && styles.signupButtonPressed
                        ]}
                    >
                        <Text style={styles.signupButtonText}>CREATE ACCOUNT</Text>
                    </Pressable>

                    <TouchableOpacity
                        style={styles.signinContainer}
                        onPress={() => router.navigate("./signin")}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.signinText}>Already have an account? </Text>
                        <Text style={styles.signinLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    headerSection: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
    },
    logoCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ff8c00',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    logoText: {
        fontSize: 30,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 6,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 15,
        color: '#666666',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#ff8c00',
        borderRadius: 20,
        padding: 25,
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
        fontSize: 22,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 25,
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#ff8c00',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    halfInputContainer: {
        width: '47%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 6,
    },
    inputWrapper: {
        borderWidth: 2,
        borderColor: '#ff8c00',
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    textInput: {
        height: 50,
        paddingHorizontal: 14,
        fontSize: 15,
        color: '#000000',
        backgroundColor: 'transparent',
    },
    signupButton: {
        backgroundColor: '#ff8c00',
        height: 55,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    signupButtonPressed: {
        backgroundColor: '#e67e00',
        transform: [{ scale: 0.98 }],
    },
    signupButtonText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 1,
    },
    signinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    signinText: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
    },
    signinLink: {
        fontSize: 14,
        color: '#ff8c00',
        fontWeight: '700',
    },
})