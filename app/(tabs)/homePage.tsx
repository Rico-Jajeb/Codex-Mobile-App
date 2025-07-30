import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Drawer, Icon, MD3Colors, Searchbar } from 'react-native-paper';

export default function HomeScreen() {
const [searchQuery, setSearchQuery] = React.useState('');
    const [active, setActive] = React.useState('');
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
           <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
        
          <Drawer.CollapsedItem
     focusedIcon="inbox"
     unfocusedIcon="inbox-outline"
     label="Inbox"
   />


  <Icon
    source="camera"
    color={MD3Colors.error50}
    size={20}
  />

     <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />

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
 
});
