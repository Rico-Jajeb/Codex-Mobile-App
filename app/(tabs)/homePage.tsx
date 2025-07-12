import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

type SystemInfo = {
  system_name: string;
  system_slogan: string;
  facebook: string;
  linked: string;
  github: string;
  email: string;
  
  image_url: string;
  image_logo: string;
};

const API_URL = 'http://192.168.254.169:8000/api/system-info';

export default function HomeScreen() {
  const [system, setSystem] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { width: screenWidth } = Dimensions.get('window');

  useEffect(() => {
    axios
      .get<SystemInfo>(API_URL)
      .then((response) => {
        setSystem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching system info:', error);
        setError('Failed to load system info');
        setLoading(false);
      });
  }, []);

  return (
    <>
        <ScrollView style={styles.container}>
            <View style={styles.mb}>

            {loading ? (
                <ActivityIndicator size="large" color="#00ffcc" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : system ? (

                <View>

                    <ImageBackground source={{ uri: system.image_url }} style={[styles.background, { width: screenWidth - 20 }]} imageStyle={styles.imageStyle} >
                        <View style={styles.overlay}>
                            <Text style={styles.slogan}> {system.system_slogan}</Text>
                            <Text style={styles.text}> {system.system_name} personal knowledge base for ideas,</Text>
                            <Text style={styles.text}>  notes, and projects.</Text>
                        </View>
                    </ImageBackground>

                    <View>
                        <Text >Recent Codex</Text>
                    </View>

                    <Text style={styles.item}>{system.system_name}</Text>

                    <Image
                        source={{ uri: system.image_url }}
                        style={{ width: 100, height: 100, borderRadius: 10, marginTop: 8 }}
                        resizeMode="cover"
                    />
                    <Image
                        source={{ uri: system.image_logo }}
                        style={{ width: 100, height: 100, borderRadius: 10, marginTop: 8 }}
                        resizeMode="cover"
                    />
                </View>

            ) : null}

            </View>
        </ScrollView>
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#797e7eff',
    paddingTop: 30,
   
    paddingRight: 50,
    
    marginBottom: 2,
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
  mb:{
    marginBottom: 100,
  },

//----------------  Main page System Background image -------
    background: {
        height: 350,
        marginTop: 0,
        justifyContent: 'center', 
        alignItems: 'center',     
         margin: 10,
    },

    imageStyle: {
        borderRadius: 10, // same as before
        
    },

    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)', // optional: darken for better text contrast
        padding: 5,
       
    },

    text: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    slogan:{
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },


});
