import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// import {UploadContent} from './views/uploadContent';
import {userColors} from './lib/colors';
import {Feed} from './views/feed';

import {createStackNavigator} from '@react-navigation/stack';
import {SelectChallenge} from './views/selectChallenge';
import {ViewVideo} from './views/viewVideo';
import {CameraView} from './views/cameraView';
import {useCameraPermission} from 'react-native-vision-camera';
import {SuccessView} from './views/success';

type RootStackParamList = {
  feed: undefined;
  select: undefined;
  video: undefined;
  camera: undefined;
  success: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  // const {hasMicPermission, requestMicPermission} = useMicrophonePermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.main}>
        <StatusBar barStyle={'light-content'} backgroundColor={userColors.bg} />
        <View style={styles.container}>
          <Stack.Navigator
            screenOptions={{
              header: () => null,
              cardStyle: {
                backgroundColor: userColors.bg,
              },
            }}>
            <Stack.Screen name="feed" component={Feed} />
            <Stack.Screen
              name="select"
              component={SelectChallenge}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="video"
              component={ViewVideo}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="camera"
              component={CameraView}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="success"
              component={SuccessView}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: userColors.bg,
  },
  container: {
    // flexGrow: 1,
    height: '100%',
  },
});

export default App;
