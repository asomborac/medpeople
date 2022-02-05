import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './Loading';
import JobList from './components/job_list/JobList';
import JobDetails from './components/job_details/JobDetails';

export default function App() {

  const Stack = createNativeStackNavigator();

  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="List" component={JobList} />
      <Stack.Screen name="Details" component={JobDetails} />
    </Stack.Navigator>
  </NavigationContainer>
};