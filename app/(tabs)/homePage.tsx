import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';


import { Button, Modal, PaperProvider, Portal, Text } from 'react-native-paper';

export default function HomeScreen() {
     const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, height: 300};

return (

   <ScrollView style={styles.container}>
        <View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Search Codex by title</Text>
            </TouchableOpacity> 
        </View>

        <View style={styles.introCont}>
            <Text style={styles.h1}>Welcome to SunRaku's Test Ground</Text>
        
        </View>
     

      <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>

   </ScrollView>


);

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  introCont: {
    marginTop: 100,
  },

  h1: {
    color: 'white',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2: {
    color: '#9CA3AF',
    marginBottom: 4,
    fontSize: 15,
    
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
   text: {
    marginTop: 20, fontSize: 18,
  },
 
});

