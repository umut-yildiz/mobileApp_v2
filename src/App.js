import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Machine from './components/Machine';
import MOS from './components/MOS';
import Details from './components/Details';

const App = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Machine" component={Machine} />
        <Stack.Screen name="MOS" component={MOS} />
        {/* <Stack.Screen name="SensorX" component={SensorX} />
        <Stack.Screen name="Nuova_I" component={Nuova_I} />
        <Stack.Screen name="Flexicut" component={Flexicut} /> */}
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;