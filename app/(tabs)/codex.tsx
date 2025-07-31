import * as React from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import ManualDrawer from './manualdrawer';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
 const [drawerOpen, setDrawerOpen] = React.useState(false);
return (

   <ScrollView style={styles.container}>
  
        <View style={styles.container3}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.hamburger}>
            <Text style={styles.hamburgerText}>☰</Text>
          </TouchableOpacity>

          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ flex: 1, marginLeft: 10 }} // 🧠 makes Searchbar take remaining space
          />

          <ManualDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Button title="Close" onPress={() => setDrawerOpen(false)} />
            <ScrollView style={styles.navBut}>
              <Text style={styles.drawerText}>Laravel</Text>
              <Text style={styles.drawerText}>React native</Text>
              <Text style={styles.drawerText}>Infinityfree</Text>            
                        
            </ScrollView>

          </ManualDrawer>
        </View>

        <View style={styles.introCont}>
            <Text style={styles.h1}>Welcome to SunRaku's Codex Documentation 🎉</Text>
            <Text style={styles.h2}>Select a codex on the left to explore detailed information including code snippets, frameworks, and outputs.</Text>
            <Text style={styles.h2}>This codex system is designed to help you document, manage, and quickly reference your important code and technical notes.</Text>
            <Text style={styles.h2}>Use the sidebar to browse categories or try the search feature to jump right in.</Text>
        </View>

 
     

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
  drawerText: {
    fontSize: 18,
    marginBottom: 20,
  },
    hamburger: {
    padding: 0,
    margin: 0,
    backgroundColor: '#000000',
  },
  hamburgerText: {
    fontSize: 17,
    color: 'white',
  },
  container3: {
  flexDirection: 'row',       // 💡 Make children appear in one line
  alignItems: 'center',       // 🔄 Vertically center the hamburger and searchbar
  justifyContent: 'space-between', // Optional: adds spacing between them
  paddingHorizontal: 10,
  paddingVertical: 5,
  
  },
  navBut: {
    marginTop: 30,
  },
});
