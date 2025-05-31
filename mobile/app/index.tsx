import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const index = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.IndexContainer}>
            <Image source={require("../assets/images/index.jpg")} style={styles.IndexImg} />
            <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']}
                locations={[0, 0.5, 1]}
                style={styles.gradientOverlay}
            />

            <View style={styles.IndexContent}>

                <View style={styles.brandSection}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>SECURUM</Text>
                        <Text style={styles.titleSecondary}>SOLUTIO</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.subTitle}>
                        Manage finances, payments and transactions without stress
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => router.navigate("./signin")}
                        style={[styles.indexButton, styles.primaryButton]}
                        android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                        <Text style={styles.primaryButtonText}>SIGN IN</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.navigate("./signup")}
                        style={[styles.indexButton, styles.secondaryButton]}
                        android_ripple={{ color: 'rgba(255,165,0,0.2)' }}
                    >
                        <Text style={styles.secondaryButtonText}>CREATE ACCOUNT</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Secure • Reliable • Modern</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    IndexContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    IndexImg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
    },
    gradientOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
    },
    IndexContent: {
        flex: 1,
        zIndex: 3,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    brandSection: {
        alignItems: 'center',
        marginTop: 60,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: 'black',
        letterSpacing: 2,
        textAlign: 'center',
    },
    titleSecondary: {
        fontSize: 32,
        fontWeight: '600',
        color: 'orange',
        letterSpacing: 1.5,
        marginTop: -8,
    },
    divider: {
        width: 80,
        height: 3,
        backgroundColor: 'orange',
        marginVertical: 20,
        borderRadius: 2,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
        textAlign: "center",
        lineHeight: 24,
        maxWidth: 300,
        marginHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
    },
    indexButton: {
        width: '80%',
        maxWidth: 280,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButton: {
        backgroundColor: "orange",
        borderWidth: 2,
        borderColor: "orange",
    },
    secondaryButton: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "orange",
    },
    primaryButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
    },
    secondaryButtonText: {
        color: "orange",
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    footerText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
})