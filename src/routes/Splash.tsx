import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from 'react-native-navigation-hooks';
import { NavigationProps } from 'react-native-navigation';

import { routes } from './config';
import { fetchConfigFx } from '../state/variants';

export function SplashScreen({ componentId }: NavigationProps) {
  const { setStackRoot } = useNavigation(componentId);

  const init = async () => {
    await fetchConfigFx();
    setStackRoot({
      component: {
        name: routes.home,
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading</Text>
    </View>
  );
}
