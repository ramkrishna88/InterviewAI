import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {
  checkMicrophonePermission,
  requestMicrophonePermission,
  checkPhotoLibraryPermission,
  requestPhotoLibraryPermission,
} from '../../permissions/permissions';

const InterviewScreen = ({route}) => {
  const {selectedTech} = route.params;
  const [microphoneStatus, setMicrophoneStatus] = useState('checking');
  const [photoLibraryStatus, setPhotoLibraryStatus] = useState('checking');

  useEffect(() => {
    const checkPermissions = async () => {
      const micStatus = await checkMicrophonePermission();
      setMicrophoneStatus(micStatus);
      const libraryStatus = await checkPhotoLibraryPermission();
      setPhotoLibraryStatus(libraryStatus);
    };

    checkPermissions();
  }, []);

  const handleRequestMicrophonePermission = async () => {
    const result = await requestMicrophonePermission();
    setMicrophoneStatus(result);
    if (result === 'denied') {
      Alert.alert(
        'Microphone permission denied',
        'Please enable it in settings.',
      );
    }
  };

  const handleRequestPhotoLibraryPermission = async () => {
    const result = await requestPhotoLibraryPermission();
    setPhotoLibraryStatus(result);
    if (result === 'denied') {
      Alert.alert(
        'Photo Library permission denied',
        'Please enable it in settings.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Technology:</Text>
      <Text style={styles.techText}>{selectedTech}</Text>

      <Text style={styles.permissionStatus}>
        Microphone Permission:{' '}
        {microphoneStatus === 'granted' ? 'Granted' : 'Not Granted'}
      </Text>
      <Button
        title="Request Microphone Permission"
        onPress={handleRequestMicrophonePermission}
        disabled={microphoneStatus === 'granted'}
      />

      <Text style={styles.permissionStatus}>
        Photo Library Permission:{' '}
        {photoLibraryStatus === 'granted' ? 'Granted' : 'Not Granted'}
      </Text>
      <Button
        title="Request Photo Library Permission"
        onPress={handleRequestPhotoLibraryPermission}
        disabled={photoLibraryStatus === 'granted'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  techText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  permissionStatus: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default InterviewScreen;
