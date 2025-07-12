import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// 🔥 Define a TypeScript type for each skill
type TechSkill = {
  id: number;
  tech_name: string;
  img: string;
  image_url: string;
};

const API_URL = 'http://192.168.254.169:8000/api/tech-skills';

export default function HomeScreen() {
  const [skills, setSkills] = useState<TechSkill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<TechSkill[]>(API_URL)
      .then((response) => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching tech skills:', error);
        setError('Failed to load skills');
        setLoading(false);
      });
  }, []);

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello, this is the Main Page</Text>

    

      <SafeAreaView>
        <Text style={styles.subText}>HAHAHAH</Text>
      </SafeAreaView>

      {loading ? (
        <ActivityIndicator size="large" color="#00ffcc" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>

           
                <Text style={styles.item}>{item.tech_name} </Text>

                <Image
  source={{ uri: item.image_url }}
  style={{ width: 100, height: 100, borderRadius: 10, marginTop: 8 }}
  resizeMode="cover"
/>


            </View>     
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121313ff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: 'white',
    marginBottom: 20,
  },
  reactLogo: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  item: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
