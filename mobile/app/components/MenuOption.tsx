import { TouchableOpacity } from "react-native";
import React, {ReactNode} from 'react';
import { StyleSheet } from "react-native";

export const MenuOption=({
    onSelect,
    children,   
}:{
    onSelect:()=>void;
    children: ReactNode
})=>{
    return(
        <TouchableOpacity onPress={onSelect} style={styles.menuOption}>
            {children}
        </TouchableOpacity>
    )
}
export default MenuOption
const styles=StyleSheet.create({
    menuOption:{
        width:"100%",
        flexDirection:"column",
        justifyContent:"space-evenly",
        height:50
    }
})