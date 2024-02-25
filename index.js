import { Navigation } from 'react-native-navigation';

import { HomeScreen, SplashScreen } from './src/routes';
import { routes } from './src/routes/config';

Navigation.registerComponent(routes.splash, () => SplashScreen);
Navigation.registerComponent(routes.home, () => HomeScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: routes.splash,
            },
          },
        ],
      },
    },
  });
});
