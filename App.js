import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobList from './components/job_list/JobList';
import JobDetails from './components/job_details/JobDetails';

export default function App() {

  const [data, setData] = useState({});

  const handleData = (value) => setData(value);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={JobList} />
        <Stack.Screen name="Details" component={JobDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};