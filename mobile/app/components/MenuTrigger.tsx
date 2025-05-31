import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

export const MenuTrigger = ({ children }: { children: ReactNode }) => {
    return (
        <View style={styles.triggerContainer}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    triggerContainer: {
        // Add subtle styling to make trigger more defined
        borderRadius: 8,
        overflow: 'hidden',
    }
});

export default MenuTrigger;