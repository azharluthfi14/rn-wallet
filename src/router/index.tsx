import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '@/screen';
import {AppStackParamList} from '@/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const Router = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <>
        <Stack.Screen name="Home" component={Home} />
      </>
    </Stack.Navigator>
  );
};
