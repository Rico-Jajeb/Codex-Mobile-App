
import { Button, Card, Modal } from '@ui-kitten/components';
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

type CodexItem = {
  id: number;
  codex_name: string;
  content: string;
  language: string[];
  framework: string[];
  created_at: string;
  category_name: string;
  tags: string;
  diffuclt_level: string;
  code_snippet: string;
  instructions: string;
  output: string;
};

type APIResponse = {
  system: SystemInfo;
  codex: CodexItem[];
};

const API_URL = 'http://192.168.254.169:8000/api/system-info';

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
  const [system, setSystem] = useState<SystemInfo | null>(null);
  const [codex, setCodex] = useState<CodexItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);
  const { width: screenWidth } = Dimensions.get('window');

  const [selectedCodex, setSelectedCodex] = useState<CodexItem | null>(null);


  useEffect(() => {
    axios
      .get<APIResponse>(API_URL)
      .then((response) => {
        setSystem(response.data.system);
        setCodex(response.data.codex);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching system info:', error);
        setError('Failed to load data');
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
              <ImageBackground source={{ uri: system.image_url }} style={[styles.background, { width: screenWidth - 20 }]} imageStyle={styles.imageStyle}>
                <View style={styles.overlay}>
                  <Text style={styles.slogan}>{system.system_slogan}</Text>
                  <Text style={styles.text}>{system.system_name} personal knowledge base for ideas,</Text>
                  <Text style={styles.text}>notes, and projects.</Text>
                </View>
              </ImageBackground>

              {/* CODEX SECTION */}
              <View style={styles.codex}>
                <Text style={styles.title}>Recent Codex</Text>
                <Text style={styles.subtitle}>Latest documentation and code snippets from my knowledge base.</Text>

                  {codex.length > 0 ? (
                  codex.map((item) => (
                    <View style={styles.codexCard} key={item.id}>
                      <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{item.codex_name}</Text>
                      <Text style={styles.cardContent} numberOfLines={5} ellipsizeMode="tail">{item.content}</Text>

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
                      <View style={styles.footer}>
                          <Text style={styles.subtitle}>
                              {new Date(item.created_at).toISOString().split('T')[0]}
                          </Text>   
                           <Button style={styles.btn} size="tiny" appearance="ghost" onPress={() => { setSelectedCodex(item); setVisible(true);}}>
                             0
                            </Button>
             
                      </View>


                    </View>
                  ))
                ) : (
                  <Text style={{ color: 'gray', marginTop: 10 }}>No codex data yet.</Text>
                )}

             

              </View>

              <Text style={styles.item}>{system.system_name}</Text>

              <Image source={{ uri: system.image_url }} style={{ width: 100, height: 100, borderRadius: 10, marginTop: 8 }} resizeMode="cover" />
              <Image source={{ uri: system.image_logo }} style={{ width: 100, height: 100, borderRadius: 10, marginTop: 8 }} resizeMode="cover" />
            </View>
          ) : null}
        </View>

    <Modal visible={visible}  >
        <Card disabled={true} style={styles.bgwhite}>
          <View style={styles.clsbtn}>
              <Button onPress={() => { setVisible(false); setSelectedCodex(null);}} style={styles.btn} size="tiny" appearance="ghost">
                x
              </Button>            
          </View>

          <ScrollView>
            {selectedCodex ? (
              <View >
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{selectedCodex.codex_name}</Text>
                
                <Text style={styles.category}> <Text style={styles.txtD}>Category:</Text>  {selectedCodex.category_name}</Text>
                <Text style={styles.category}> <Text style={styles.txtD}>Language:</Text>  {selectedCodex.language.join(', ')}</Text>
                <Text style={styles.category}> <Text style={styles.txtD}>Framework:</Text>  {selectedCodex.framework.join(', ')}</Text>
                <Text style={styles.category}> <Text style={styles.txtD}>Tags:</Text>  {selectedCodex.tags}</Text>
                <Text style={styles.category}> <Text style={styles.txtD}>Level:</Text>  {selectedCodex.diffuclt_level}</Text>

                <Text style={styles.content}> <Text style={styles.txtD}>Content:</Text>  {selectedCodex.content}</Text>
                <Text style={styles.content}> <Text style={styles.txtD}>Instructions:</Text>  {selectedCodex.instructions}</Text>

                <Text style={styles.code2}>Code:</Text>
                <Text style={styles.code}>   {selectedCodex.code_snippet}</Text>

                <Text style={styles.content}> <Text style={styles.txtD}>Output:</Text>  {selectedCodex.output}</Text>

              </View>
              
            ) : (
              <Text>No codex selected</Text>
            )}            
          </ScrollView>


      
        </Card>
    </Modal>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 30,
    marginBottom: 2,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  mb: {
    marginBottom: 100,
  },
  background: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slogan: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    fontSize: 13,
  },

//-------------------------codex ------------------


  codex: {
    padding: 10,
  },

  codexCard: {
    backgroundColor: 'white',
    height: 280,
    borderRadius: 5,
    marginTop: 30,
    padding: 20,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardContent: {
   height: 100,
    marginTop: 10,
    color: 'gray',
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
  item: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },

  language: {
    gap: 6,
  },
  framework: {
    gap: 6,
  },

   backdrop: {
    backgroundColor: 'white',
  },
  
  btn:{
    width: 50,
  }, 
  footer:{
    flexDirection: 'row',     
    justifyContent: 'space-between', 
    alignItems: 'center',     
    marginTop: 10,

  },
  bgwhite:{
    backgroundColor: 'white',
    height: 500,
  },
  clsbtn:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  category:{
    marginTop: 3,
    color: 'gray',
  },
  txtD: {
    color: '#000000',
  },
  content: {
    marginTop: 10,
    color: '#4b5563',
  },
  code: {
    marginTop: 10,
    color: 'white',
    backgroundColor: 'black',
  },
  code2: {
    marginTop: 20,
  }


});
