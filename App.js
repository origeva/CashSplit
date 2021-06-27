import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Main from './components/Main';
import Settings from './components/Settings';
import SettingsContext from './contexts/SettingsContext';

const Stack = createStackNavigator();

const App = () => {
  const [settings, setSettings] = useState({
    roundRestaurantProvisionDown: {
      name: 'Round Restaurant Down',
      description: '',
      value: false,
    },
    roundManagerProvisionDown: {
      name: 'Round Manager Down',
      description: '',
      value: true,
    },
    roundBartenderProvisionDown: {
      name: 'Round Bartender Down',
      description: '',
      value: true,
    },
    roundRestaurantToNearest: {
      name: 'Round Restaurant to Nearest',
      description: '',
      value: 0.5,
    },
    roundManagerToNearest: {
      name: 'Round Manager to Nearest',
      description: '',
      value: 1,
    },
    roundBartenderToNearest: {
      name: 'Round Bartender to Nearest',
      description: '',
      value: 1,
    },
  });

  return (
    <SettingsContext.Provider value={{settings, setSettings}}>
      <NavigationContainer>
        <StatusBar backgroundColor="darkslateblue" />
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'darkslateblue',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'lightgray',
            },
          }}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={({navigation}) => ({
              title: 'CashSplit',
              // headerRight: () => {
              //   <MaterialIcon
              //     name="settings"
              //     onPress={() => {
              //       navigation.navigate('Settings');
              //     }}
              //   />;
              // },
            })}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
};

export default App;
