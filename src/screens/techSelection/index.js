import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';

const TechSelectionScreen = ({navigation}) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Welcome to Interview AI!</Text>
      <Text style={styles.sectionDescription}>
        This is a app to Help at your Interview.
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
});

export default TechSelectionScreen;
