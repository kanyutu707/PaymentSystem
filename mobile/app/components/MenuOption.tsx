import { TouchableOpacity, View } from "react-native";
import React, { ReactNode, useState } from 'react';
import { StyleSheet } from "react-native";

export const MenuOption = ({
    onSelect,
    children,   
}: {
    onSelect: () => void;
    children: ReactNode;
}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity 
            onPress={onSelect} 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={[
                styles.menuOption,
                isPressed && styles.menuOptionPressed
            ]}
            activeOpacity={0.7}
        >
            <View style={styles.optionContent}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuOption: {
        width: "100%",
        borderRadius: 8,
        marginVertical: 2,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    menuOptionPressed: {
        backgroundColor: '#FF6B35', 
        borderColor: '#FF6B35',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        width:"100%"
    },
    optionContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: 24,
        width:"100%"
    }
});

export default MenuOption;