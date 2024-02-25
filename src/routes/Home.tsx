import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Editor } from '../components/Editor';
import { ElementsProvider } from '../contexts/EditorElementsContext';

export function HomeScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ElementsProvider>
        <Editor />
      </ElementsProvider>
    </GestureHandlerRootView>
  );
}
