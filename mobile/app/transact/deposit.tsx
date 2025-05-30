import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';

const { height: screenHeight } = Dimensions.get('window');

const deposit = () => {
    const [showMpesaOptions, setShowMpesaOptions] = useState<boolean>(false);
    const [showStripeOptions, setShowStripeOptions] = useState<boolean>(false);
    const [showPaypalOptions, setShowPaypalOptions] = useState<boolean>(false);
    const [showBankOptions, setShowBankOptions] = useState<boolean>(false);
    const [showAgentOptions, setShowAgentOptions] = useState<boolean>(false);


    const mpesaSlideAnim = useRef(new Animated.Value(screenHeight)).current;
    const stripeSlideAnim = useRef(new Animated.Value(screenHeight)).current;
    const paypalSlideAnim = useRef(new Animated.Value(screenHeight)).current;
    const bankSlideAnim = useRef(new Animated.Value(screenHeight)).current;
    const agentSlideAnim = useRef(new Animated.Value(screenHeight)).current;


    const animateSlideUp = (animValue: Animated.Value, show: boolean) => {
        Animated.timing(animValue, {
            toValue: show ? 0 : screenHeight,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };


    useEffect(() => {
        animateSlideUp(mpesaSlideAnim, showMpesaOptions);
    }, [showMpesaOptions]);

    useEffect(() => {
        animateSlideUp(stripeSlideAnim, showStripeOptions);
    }, [showStripeOptions]);

    useEffect(() => {
        animateSlideUp(paypalSlideAnim, showPaypalOptions);
    }, [showPaypalOptions]);

    useEffect(() => {
        animateSlideUp(bankSlideAnim, showBankOptions);
    }, [showBankOptions]);

    useEffect(() => {
        animateSlideUp(agentSlideAnim, showAgentOptions);
    }, [showAgentOptions]);

    const renderForm = (animValue: Animated.Value, onClose: () => void, title: string) => (
        <Animated.View
            style={[
                styles.modalOverlay,
                {
                    transform: [{ translateY: animValue }]
                }
            ]}
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title} Payment</Text>
                    <AntDesign name="closecircle" size={24} color="orange" onPress={onClose} />
                </View>
                <Text style={styles.transferLabel}>Phone Number</Text>
                <TextInput style={styles.transferInput} placeholder="Enter phone number" />
                <Text style={styles.transferLabel}>AMOUNT</Text>
                <TextInput style={styles.transferInput} placeholder="Enter amount" keyboardType="numeric" />
                <Text style={styles.transferLabel}>PASSWORD</Text>
                <TextInput style={styles.transferInput} placeholder="Enter password" secureTextEntry />
                <Pressable style={styles.transferFormBtn}>
                    <Text style={styles.transferFormBtnTxt}>PAY</Text>
                </Pressable>
            </View>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.deposit}>
                <Text style={styles.header}>SELECT DEPOSIT METHOD</Text>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => setShowMpesaOptions(true)} style={styles.card}>
                        <Image style={styles.logo} source={require('../../assets/images/mpesa.jpg')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => setShowStripeOptions(true)}>
                        <Image style={styles.logo} source={require('../../assets/images/stripe.jpg')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.card} onPress={() => setShowPaypalOptions(true)}>
                        <Image style={styles.logo} source={require('../../assets/images/paypal.jpg')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => setShowBankOptions(true)}>
                        <Image style={styles.logo} source={require('../../assets/images/bank.jpg')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.card} onPress={() => setShowAgentOptions(true)}>
                        <Image style={styles.logo} source={require('../../assets/images/agent.jpg')} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {showMpesaOptions && renderForm(mpesaSlideAnim, () => setShowMpesaOptions(false), "M-Pesa")}
            {showStripeOptions && renderForm(stripeSlideAnim, () => setShowStripeOptions(false), "Stripe")}
            {showPaypalOptions && renderForm(paypalSlideAnim, () => setShowPaypalOptions(false), "PayPal")}
            {showBankOptions && renderForm(bankSlideAnim, () => setShowBankOptions(false), "Bank")}
            {showAgentOptions && renderForm(agentSlideAnim, () => setShowAgentOptions(false), "Agent")}
        </View>
    )
}

export default deposit

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 17,
        fontWeight: '800',
        backgroundColor: "white",
        padding: 4,
        margin: 10
    },
    deposit: {
        flex: 1,
        width: "100%",
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
        minHeight: '60%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    transferFormBtn: {
        backgroundColor: "orange",
        height: 45,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    transferFormBtnTxt: {
        fontWeight: '800',
        color: 'white',
        fontSize: 16,
    },
    transferLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    transferInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    row: {
        flexDirection: "row",
        width: "100%",
        padding: "2%",
        justifyContent: 'space-around',
    },
    card: {
        margin: "2%",
        backgroundColor: "white",
        width: "46%",
        borderRadius: 5,
        padding: "1%",
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: "orange",
        borderWidth: 2
    },
    logo: {
        width: "100%",
        height: 150,
        resizeMode: 'contain'
    }
})