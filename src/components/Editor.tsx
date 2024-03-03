import { Canvas, useCanvasRef, useFonts } from '@shopify/react-native-skia';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Share,
  StyleSheet,
  View,
  Button,
  TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { useElementsContext } from '../contexts/EditorElementsContext';
import { TextView } from './TextView';
import { ImageView } from './ImageView';
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
  const [uploadedImg, setUploadedImg] = useState('');

  const submit = () => {
    const img = ref.current!.makeImageSnapshot().encodeToBase64();
    const data = `data:image/png;base64,${img}`;
    Share.share({ url: data });
  };

  const uploadImg = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response.assets) {
          setUploadedImg(response.assets[0].base64!);
          return;
        }
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          console.log('Unknown error', response.errorMessage);
        }
      },
    );
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
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />
      <Button title="Upload Image" onPress={uploadImg} />
      <GestureHandler>
        <View style={[styles.canvas, { width, height }]}>
          <Canvas style={{ height, width }} ref={ref}>
            {uploadedImg ? (
              <ImageView base64={uploadedImg} canvasSize={{ width, height }} />
            ) : (
              <ColorBackdropView
                params={variant.backdrop}
                canvasSize={{ width, height }}
              />
            )}
            <TextView
              canvasSize={{ width, height }}
              font={customFontMgr}
              params={variant.description}
              text={description}
            />
            <TextView
              canvasSize={{ width, height }}
              font={customFontMgr}
              params={variant.title}
              text={title}
            />
          </Canvas>
        </View>
      </GestureHandler>
      <Button title="Share" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  input: {
    padding: 8,
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 24,
  },
});
