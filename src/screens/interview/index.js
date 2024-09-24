import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InterviewScreen = ({route}) => {
  const {selectedTech} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Technology:</Text>
      <Text style={styles.techText}>{selectedTech}</Text>
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
});

export default InterviewScreen;
