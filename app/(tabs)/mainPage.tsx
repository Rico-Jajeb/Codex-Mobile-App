import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

const API_POST_URL = 'http://192.168.254.169:8000/api/v1/tech-skills';

export default function UploadSkillScreen() {
  const [techName, setTechName] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Media library permission is needed.');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // <- use `MediaTypeOptions.Images` not `MediaType`
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImage(asset);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const submitForm = async () => {
    if (!techName || !image) {
      Alert.alert('Please enter a tech name and pick an image.');
      return;
    }

    const formData = new FormData();
    formData.append('tech_name', techName);
    formData.append('img', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);

    setLoading(true);

    try {
      const response = await axios.post(API_POST_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Tech skill uploaded!');
      setTechName('');
      setImage(null);
    } catch (error: any) {
      console.error('Upload error:', error.response?.data || error.message);
      Alert.alert('Error', 'Upload failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter tech name"
        value={techName}
        onChangeText={setTechName}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <Button title="Pick Image" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.preview}
        />
      )}

      <Button
        title={loading ? 'Uploading...' : 'Submit'}
        onPress={submitForm}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121313',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
  },
  preview: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
