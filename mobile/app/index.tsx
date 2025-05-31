import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const index = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.IndexContainer}>
            <Image source={require("../assets/images/index.jpg")} style={styles.IndexImg} />
            <View style={styles.IndexContent}>

                <View style={styles.title}><Text style={styles.top}>SECURUM</Text> <Text style={styles.bottom}>SOLUTIO</Text></View>
                <View style={styles.lowerContent}>
                    <Text style={styles.subTitle}>MANAGE FINANCES, PAYMENTS AND TRANSACTIONS WITHOUT STRESS</Text>

                    <Pressable onPress={() => router.navigate("./signin")} style={styles.indexButton}>
                        <Text>SIGN IN</Text>
                    </Pressable>
                    <Pressable onPress={() => router.navigate("./signup")} style={styles.indexButton}>
                        <Text>SIGN UP</Text>
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    IndexContainer: {
        flex: 1,
        position: "relative",
        borderColor: "white",
        borderWidth: 2,
        backgroundColor: "white",
    },
    title: {
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    top: {
        fontSize: 40,
        fontWeight: 800,
        marginVertical: 10,
      
        alignItems: "center",
        justifyContent: "center"
    },
    bottom: {
        fontSize: 32,
        fontWeight: 800,
        marginVertical: 10,
        color: "orange",
     
        alignItems: "center",
        justifyContent: "center"
    },
    lowerContent: {
        alignItems: "center",
        width: "100%"
    },

    subTitle: {
        fontSize: 16,
        fontWeight: 600,
        width: "100%",
        textAlign: "center",
        padding: 3,
        marginVertical:20,
        marginHorizontal:10,
        paddingVertical:"5%",
        paddingHorizontal:"4%",
        
    },
    indexButton: {
        marginVertical: 12,
        backgroundColor: "orange",
        padding: 2,
        width: 300,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",

    },
    IndexContent: {
        flex: 1,
        zIndex: 2,
        justifyContent: 'space-evenly',
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        opacity: 0.90,
        textAlign: "center"
    },
    IndexImg: {
        width: "100%",
        height: "100%",
        position: "absolute",

        zIndex: 1,
    }
})