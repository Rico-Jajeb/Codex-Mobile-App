import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BASE_URL } from '@/config/api';

type ProjectInfo = {
  proj_name: string;
};

export default function HomeScreen() {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects-api`);
        console.log('API response:', response.data);

        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('Error fetching project info:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.listContainer}>
      <Text style={styles.title}>Projects</Text>
      <Text style={styles.caption}>A collection of my recent work and personal projects.</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ffcc" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : projects.length > 0 ? (
        projects.map((item, index) => (
          <View key={index} style={styles.projectItem}>
            <Text style={styles.projectText}>{item.proj_name}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.message}>No projects found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 5,
  },
  caption: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  projectItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  projectText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
  message: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
