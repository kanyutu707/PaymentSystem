import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { View, Modal, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

// Export screen width for easy access
export const SCREEN_WIDTH = Dimensions.get('window').width;

interface DropdownMenuProps {
  visible: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean; // New prop to control full width behavior
  widthPercentage?: number; // Percentage of screen width (0-1)
  dropdownWidth?: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  visible,
  handleOpen,
  handleClose,
  trigger,
  children,
  fullWidth = false, // Default to false for backward compatibility
  widthPercentage, // New prop for percentage width
  dropdownWidth = 200,
}) => {
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState({x: 0, y: 0, width: 0});
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (triggerRef.current && visible) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + height + 5,
          width: width,
        });
      });
    }
  }, [visible]);

  const getMenuStyle = () => {
    if (fullWidth) {
      return {
        top: position.y,
        left: 0,
        right: 0,
        width: screenWidth,
      };
    } else if (widthPercentage) {
      const calculatedWidth = screenWidth * widthPercentage;
      return {
        top: position.y,
        left: (screenWidth - calculatedWidth) / 2, // Center the dropdown
        width: calculatedWidth,
      };
    } else {
      return {
        top: position.y,
        left: position.x + Number(position.width) / 2 - Number(dropdownWidth) / 2,
        width: Number(dropdownWidth),
      };
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {visible && (
        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={handleClose}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.menu,
                  getMenuStyle(),
                ]}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: "100%"
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default DropdownMenu;