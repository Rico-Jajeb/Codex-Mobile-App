import { Button, Card, Modal, Radio } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [checked, setChecked] = React.useState(false);
const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello, this is the Main Page</Text>

      <Radio
        checked={checked}
        onChange={nextChecked => setChecked(nextChecked)}
      >
        {`Checked: ${checked}`}
      </Radio>
      <Button onPress={() => setVisible(true)}>
        TOGGLE MODAL
      </Button>
          <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text>
Welcome to UI Kitten 😻
          </Text>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Card>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#222', // optional, dark background
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
    
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
