import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, } from 'react-native';

import { BASE_URL } from '@/config/api';

type ProjectInfo = {
  proj_name: string;
  proj_description: string;
  language: string;
  framework: string;
  screenshots: string;
  thumbnail: string;
  github_url: string;
  live_url: string;
  status: string;
  highlight: string;
  img: string;
  image_url: string;
  id: string;
};

type screenshotsInfo = {

  project_id: string,
  features: string,
  image_url2: string,

};

const languageColorMap: { [key: string]: { backgroundColor: string; color: string } } = {
  PHP:         { backgroundColor: '#E9D5FF', color: '#7E22CE' },
  JavaScript:  { backgroundColor: '#FDE68A', color: '#92400E' },
  TypeScript:  { backgroundColor: '#BFDBFE', color: '#1E3A8A' },
  Python:      { backgroundColor: '#BBF7D0', color: '#166534' },
  Ruby:        { backgroundColor: '#FCA5A5', color: '#7F1D1D' },
  Java:        { backgroundColor: '#FED7AA', color: '#9A3412' },
  'C#':        { backgroundColor: '#DDD6FE', color: '#4C1D95' },
  'C++':       { backgroundColor: '#E5E7EB', color: '#374151' },
  Go:          { backgroundColor: '#99F6E4', color: '#134E4A' },
  Dart:        { backgroundColor: '#99F6E4', color: '#134E4A' },
  Swift:       { backgroundColor: '#FED7AA', color: '#9A3412' },
  Kotlin:      { backgroundColor: '#DDD6FE', color: '#6B21A8' },
  Rust:        { backgroundColor: '#FDBA74', color: '#7C2D12' },
  Scala:       { backgroundColor: '#F87171', color: '#7F1D1D' },
  Perl:        { backgroundColor: '#FBCFE8', color: '#831843' },
  Elixir:      { backgroundColor: '#E9D5FF', color: '#6B21A8' },
};

const frameworkColorMap: { [key: string]: { backgroundColor: string; color: string } } = {
  Vue:            { backgroundColor: '#BBF7D0', color: '#166534' },
  React:          { backgroundColor: '#BFDBFE', color: '#1E3A8A' },
  Angular:        { backgroundColor: '#FCA5A5', color: '#7F1D1D' },
  Svelte:         { backgroundColor: '#FED7AA', color: '#9A3412' },
  'Next.js':      { backgroundColor: '#D1D5DB', color: '#374151' },
  'Nuxt.js':      { backgroundColor: '#A7F3D0', color: '#065F46' },
  Codeigniter:    { backgroundColor: '#FED7AA', color: '#9A3412' },
  Laravel:        { backgroundColor: '#FECDD3', color: '#9F1239' },
  Symfony:        { backgroundColor: '#D1D5DB', color: '#374151' },
  Django:         { backgroundColor: '#BBF7D0', color: '#166534' },
  Flask:          { backgroundColor: '#E5E7EB', color: '#374151' },
  Express:        { backgroundColor: '#9CA3AF', color: '#374151' },
  NestJS:         { backgroundColor: '#FCA5A5', color: '#7F1D1D' },
  'Ruby on Rails':{ backgroundColor: '#FBCFE8', color: '#831843' },
  'Spring Boot':  { backgroundColor: '#DCFCE7', color: '#166534' },
  'ASP.NET Core': { backgroundColor: '#DBEAFE', color: '#1E3A8A' },
  'Inertia.js':   { backgroundColor: '#DDD6FE', color: '#6B21A8' },
  Remix:          { backgroundColor: '#C7D2FE', color: '#3730A3' },
  'Blitz.js':     { backgroundColor: '#FEF08A', color: '#92400E' },
  RedwoodJS:      { backgroundColor: '#F87171', color: '#7F1D1D' },
  'React Native': { backgroundColor: '#99F6E4', color: '#134E4A' },
  Flutter:        { backgroundColor: '#BAE6FD', color: '#075985' },
  Ionic:          { backgroundColor: '#BFDBFE', color: '#1E3A8A' },
  Slim:           { backgroundColor: '#D1D5DB', color: '#374151' },
  FastAPI:        { backgroundColor: '#99F6E4', color: '#134E4A' },
  Lumen:          { backgroundColor: '#FEF9C3', color: '#854D0E' },
  Koa:            { backgroundColor: '#DCFCE7', color: '#166534' },
  Qwik:           { backgroundColor: '#DDD6FE', color: '#6B21A8' },
  SolidJS:        { backgroundColor: '#DBEAFE', color: '#1E3A8A' },
  'T3 Stack':     { backgroundColor: '#E9D5FF', color: '#6B21A8' },
};


export default function HomeScreen() {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [projectsSC, setProjectsSc] = useState<screenshotsInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


 useEffect(() => {
  const fetchData = async () => {
    setLoading(true);

    try {
      const [projectRes, screenshotRes] = await Promise.all([
        axios.get(`${BASE_URL}/projects-api`),
        axios.get(`${BASE_URL}/screenshots-projects-api`)
      ]);

      const { data: projectData, status: projectStatus } = projectRes.data;
      const { data: screenshotData, status: screenshotStatus } = screenshotRes.data;

      if (projectStatus === 'success' && Array.isArray(projectData)) {
        setProjects(projectData);
      } else {
        throw new Error('Invalid projects response');
      }

      if (screenshotStatus === 'success' && Array.isArray(screenshotData)) {
        setProjectsSc(screenshotData);
      } else {
        throw new Error('Invalid screenshots response');
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
                   
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
                      {/* First image: item.image_url */}
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.galleryImage}
                        resizeMode="cover"
                      />

                      {/* Remaining screenshots from image_url2 */}
                      {projectsSC
                        .filter(item2 =>
                          item2.project_id === item.id &&
                          typeof item2.image_url2 === 'string' &&
                          item2.image_url2.trim() !== '' &&
                          !item2.features
                        )
                        .map((item2, index) => (
                          <Image
                            key={index}
                            source={{ uri: item2.image_url2 }}
                            style={styles.galleryImage}
                            resizeMode="cover"
                          />
                        ))}
                    </ScrollView>



                    <Text style={styles.title2}>{item.proj_name}</Text>
                    <Text style={styles.projectText}>{item.proj_description}</Text>
                    <Text style={styles.projectText2}>Features:</Text>

                
              
            {/* Feature Section (per project) */}
            {loading ? (
              <ActivityIndicator size="large" color="#00ffcc" style={styles.loader} />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (() => {
                const filteredFeatures = projectsSC.filter(
                  item2 =>
                    item2.project_id === item.id &&
                    typeof item2.features === 'string' &&
                    item2.features.trim().length > 0
                );

                return filteredFeatures.length > 0 ? (
                  filteredFeatures.map((item2, index) => (
                    <View key={index}>
                      <Text style={styles.feature}>• {item2.features.trim()}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.message}>No Features found.</Text>
                );
              })()}



                  

                    {/* Languages badges (first row) */}
                      <View style={[styles.language ,{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }]}>
                        {item.language && item.language.map((lang, index) => {
                          const langColor = languageColorMap[lang] || { backgroundColor: '#E5E7EB', color: '#374151' };
                          return (
                            <Text
                              key={`lang-${index}`}
                              style={[
                                styles.languageBadge,
                                { backgroundColor: langColor.backgroundColor, color: langColor.color },
                              ]}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {lang}
                            </Text>
                          );
                        })}
                      </View>
                      {/* Framework badges (new separate row) */}
                      <View style={[styles.framework, { flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }]}>
                        {item.framework && item.framework.map((fw, index) => {
                          const fwColor = frameworkColorMap[fw] || { backgroundColor: '#E5E7EB', color: '#374151' };
                          return (
                            <Text
                              key={`fw-${index}`}
                              style={[
                                styles.languageBadge,
                                { backgroundColor: fwColor.backgroundColor, color: fwColor.color },
                              ]}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {fw}
                            </Text>
                          );
                        })}
                      </View>


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
    paddingBottom: 100,
    marginBottom: 10,
   
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
    paddingBottom: 10,
  },
  projectText: {
    color: '#9CA3AF',
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
  img: {
    height: 300,
    width: 325,
  },
  title2: {
    color: 'white',
    fontSize: 17,
    marginTop: 20,
    marginBottom: 10,
  },
   projectlang: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 10,
  },
    languageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
   language: {
    gap: 6,
  },
   framework: {
    gap: 6,
  },
  feature: {
    fontSize: 16,
    color: '#9CA3AF',
  },
    projectText2: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 10,
  },
  galleryContainer: {
  marginTop: 10,
  flexDirection: 'row',
},
galleryImage: {
  width: 325,
  height: 300,
  borderRadius: 8,
  marginRight: 10,
},

});
