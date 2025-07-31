import axios from 'axios';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';


import React, { useEffect, useState } from 'react';
import ManualDrawer from '../Drawer/manualdrawer';

import { BASE_URL } from '@/config/api';

type CodexCategoryInfo = {
    category_name: string;
    description: string;
};

type CodexInfo = {
  codex_name: string;
  language: string;
  framework: string;
  tags: string;
  diffuclt_level: string;
  content: string;
  code_snippet: string;
  instructions: string;
  output: string;
  category_name: string;
  image_url: string;
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

    const [projects, setProjects] = useState<CodexCategoryInfo[]>([]);
    const [codexs, setCodex] = useState<CodexInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
  const fetchData = async () => {
    setLoading(true);

    try {
      const [projectRes, codexRes] = await Promise.all([
        axios.get(`${BASE_URL}/codex-category`),
        axios.get(`${BASE_URL}/codex-api`),
       
      ]);

      const { data: projectData, status: projectStatus } = projectRes.data;
      const { data: codexData, status: codexStatus } = codexRes.data;
     

      if (projectStatus === 'success' && Array.isArray(projectData)) {
        setProjects(projectData);
      } else {
        throw new Error('Invalid category response');
      }

      if (codexStatus === 'success' && Array.isArray(codexData)) {
        setCodex(codexData);
      } else {
        throw new Error('Invalid category response');
      }



    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load projects or screenshots.');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

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

            {loading ? (
              <ActivityIndicator size="large" color="#00ffcc" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : projects.length > 0 ? (
                projects.map((item, index) => (
              <View key={index} style={styles.h2}>

                  <Text style={styles.h2}>{item.category_name}</Text>

              </View> 
            ))) : (
                <Text style={styles.h2}>No projects found.</Text>
            )}               
            </ScrollView>

          </ManualDrawer>
        </View>

        <View style={styles.introCont}>
            <Text style={styles.h1}>Welcome to SunRaku's Codex Documentation 🎉</Text>
            <Text style={styles.h2}>Select a codex on the left to explore detailed information including code snippets, frameworks, and outputs.</Text>
            <Text style={styles.h2}>This codex system is designed to help you document, manage, and quickly reference your important code and technical notes.</Text>
            <Text style={styles.h2}>Use the sidebar to browse categories or try the search feature to jump right in.</Text>
        </View>

 
        {loading ? (
              <ActivityIndicator size="large" color="#00ffcc" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : codexs.length > 0 ? (
                codexs.map((item, index) => (
              <View key={index} style={styles.h2}>

                  <Text style={styles.h2}>{item.codex_name}</Text>

              </View> 
            ))) : (
                <Text style={styles.h2}>No projects found.</Text>
            )}     

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
   errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
});
