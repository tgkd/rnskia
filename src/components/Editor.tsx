import {
  Canvas,
  Text,
  useCanvasRef,
  useFonts,
} from '@shopify/react-native-skia';
import React, { useState } from 'react';
import { ActivityIndicator, Share, StyleSheet, View } from 'react-native';

import { useElementsContext } from '../contexts/EditorElementsContext';
import { TextView } from './TextView';
import { ColorBackdropView } from './ColorBackdropView';
import { GestureHandler } from './GestureHandler';

export function Editor() {
  const fonts = {
    Ambidexter: [require('../assets/fonts/Ambidexter/ambidexter_regular.otf')],
    DRUZHOK: [require('../assets/fonts/DRUZHOK/DRUZHOK.otf')],
    Finlandica: [require('../assets/fonts/Finlandica/Finlandica-Regular.ttf')],
    Lithium: [require('../assets/fonts/Lithium_tf/Lithium_tf.otf')],
    Onest: [require('../assets/fonts/Onest/Onest-Regular.ttf')],
    Ramona: [require('../assets/fonts/Ramona/Ramona-Light.ttf')],
    Tektur: [require('../assets/fonts/Tektur/Tektur-Regular.ttf')],
    Unbounded: [require('../assets/fonts/Unbounded/Unbounded-Regular.ttf')],
  };

  const ref = useCanvasRef();
  const customFontMgr = useFonts(fonts);
  const { size, variant } = useElementsContext();
  const [description, setDescription] = useState(
    'Free templates for social media posts',
  );
  const [title, setTitle] = useState('Designed by you!');

  const submit = () => {
    const img = ref.current!.makeImageSnapshot().encodeToBase64();
    const data = `data:image/png;base64,${img}`;
    Share.share({ url: data });
  };

  if (!size || !variant) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const width = size.width * size.ratio;
  const height = size.height * size.ratio;

  return (
    <View style={styles.container}>
      <GestureHandler>
        <View style={[styles.canvas, { width, height }]}>
          <Canvas style={{ height, width }} ref={ref}>
            <ColorBackdropView
              params={variant.backdrop}
              width={width}
              height={height}
            />
            <TextView
              size={size}
              params={variant.description}
              text={description}
              font={customFontMgr}
            />
            <TextView
              font={customFontMgr}
              size={size}
              params={variant.title}
              text={title}
            />
          </Canvas>
        </View>
      </GestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  canvas: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
