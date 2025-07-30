import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
    
return (

   <ScrollView style={styles.container}>
        <View>
            <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
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
 
});
