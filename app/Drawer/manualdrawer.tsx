import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ManualDrawer({ visible, onClose, children }) {
  const translateX = React.useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <>
      {visible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX }] }
        ]}
      >
        {/* 👇 Static black text added here */}
      
        <Text style={styles.drawerTitle}>Codex Category</Text>
        {/* 👇 Still render children if passed */}
        {children}
        
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.8,
    height: 900,
    backgroundColor: '#fff',
    zIndex: 2,
    padding: 20,
    elevation: 10,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black', // 🎯 black text
    marginBottom: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: 900,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
});
