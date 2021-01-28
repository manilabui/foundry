import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

import { HomeScreen } from './src/screens/HomeScreen';

export default () => (
	<SafeAreaProvider>
	  <ApplicationProvider {...eva} theme={eva.light}>
	    <HomeScreen />
	  </ApplicationProvider>
  </SafeAreaProvider>
);
