import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  checkMicrophonePermission,
  requestMicrophonePermission,
  checkPhotoLibraryPermission,
  requestPhotoLibraryPermission,
  alertForSettings,
} from '../../permissions/permissions';

const TechSelectionScreen = ({navigation}) => {
  const [microphoneStatus, setMicrophoneStatus] = useState('checking');
  const [photoLibraryStatus, setPhotoLibraryStatus] = useState('checking');

  const technologies = [
    'Android',
    'iOS',
    'Kotlin MultiPlatform',
    'React Native',
    'React',
    'Flutter',
    'Azure',
    'AWS',
    'Big Data',
    'Data Science',
    'CS',
    'SP',
    'EX',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'Ruby',
    'Go',
  ];

  useEffect(() => {
    const checkPermissions = async () => {
      const micStatus = await checkMicrophonePermission();
      setMicrophoneStatus(micStatus);
      if (micStatus !== 'granted') {
        const result = await requestMicrophonePermission();
        setMicrophoneStatus(result);
        if (result === 'denied') {
          alertForSettings('Microphone');
        }
      }

      const libraryStatus = await checkPhotoLibraryPermission();
      setPhotoLibraryStatus(libraryStatus);
      if (libraryStatus !== 'granted') {
        const result = await requestPhotoLibraryPermission();
        setPhotoLibraryStatus(result);
        if (result === 'denied') {
          alertForSettings('Photo Library');
        }
      }
    };

    checkPermissions();
  }, []);

  const handleTechSelection = tech => {
    navigation.navigate('Interview', {selectedTech: tech});
  };

  const renderTechButton = ({item}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleTechSelection(item)}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderPermissionCard = (title, status, requestPermission) => (
    <View style={styles.permissionCard}>
      <Text style={styles.permissionTitle}>{title}</Text>
      <Text style={styles.permissionStatus}>
        Status: {status === 'granted' ? 'Granted' : 'Not Granted'}
      </Text>
      {status !== 'granted' && (
        <TouchableOpacity
          style={styles.requestButton}
          onPress={requestPermission}>
          <Text style={styles.requestButtonText}>Request Permission</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderTechCard = () => (
    <View style={styles.techCard}>
      <Text style={styles.techCardHeader}>
        Select Your Technology for InterView Support
      </Text>
      <FlatList
        data={technologies}
        renderItem={renderTechButton}
        keyExtractor={item => item}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonContainer}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Welcome to Interview AI!</Text>
      <Text style={styles.sectionDescription}>
        This is an app to Help at your Interview.
      </Text>
      {renderTechCard()}
      <View style={styles.permissionsContainer}>
        {renderPermissionCard(
          'Microphone Permission',
          microphoneStatus,
          async () => {
            const result = await requestMicrophonePermission();
            setMicrophoneStatus(result);
            if (result === 'denied') {
              Alert.alert(
                'Microphone permission denied',
                'Please enable it in settings.',
              );
            }
          },
        )}
        {renderPermissionCard(
          'Photo Library Permission',
          photoLibraryStatus,
          async () => {
            const result = await requestPhotoLibraryPermission();
            setPhotoLibraryStatus(result);
            if (result === 'denied') {
              Alert.alert(
                'Photo Library permission denied',
                'Please enable it in settings.',
              );
            }
          },
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(19, 53, 226, 0.51)',
    padding: 10,
    margin: 5,
    borderRadius: 2,
    elevation: 3,
    flex: 1,
    minWidth: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
  permissionsContainer: {
    marginVertical: 20,
  },
  permissionCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  permissionStatus: {
    marginTop: 5,
    fontSize: 16,
    color: '#666',
  },
  requestButton: {
    marginTop: 10,
    backgroundColor: 'rgba(19, 53, 226, 0.8)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  techCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    elevation: 2,
    marginTop: 10,
  },
  techCardHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
    marginBottom: 10,
  },
});

export default TechSelectionScreen;
