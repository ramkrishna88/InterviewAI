import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TechSelectionScreen from '../screens/techSelection/index';
import InterviewScreen from '../screens/interview/index';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TechSelection">
        <Stack.Screen
          name="TechSelection"
          component={TechSelectionScreen}
          options={{title: 'Select Technology'}}
        />
        <Stack.Screen
          name="Interview"
          component={InterviewScreen}
          options={{title: 'Interview'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation