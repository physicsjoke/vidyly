import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {textStyles} from '../../lib/styles';
import {userColors} from '../../lib/colors';
import {Challenge} from '../selectChallenge';
import Video from 'react-native-video';
import {getUrl} from '../../lib/localFetch';
import {UploadingScreen} from './UploadingScreen';

const width = Dimensions.get('screen').width;
const height = width * 1.3333;
const overlayVideoWidth = width / 3;

export const CameraView = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const device = useCameraDevice('front');
  const format = useCameraFormat(device, [{videoResolution: {width, height}}]);
  const cameraRef = useRef<Camera>(null);
  const [recording, setRecording] = useState(false);
  const [count, setCount] = useState(0);
  const {challenge} = route.params as {challenge: Challenge};
  const [videoPath, setVideo] = useState('');
  const [paused, setPaused] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [swapped, setSwapped] = useState(true);

  const mainPlayer = useRef<Video>(null);
  const smallPlayer = useRef<Video>(null);
  const currentVideoRef = useRef<Video>(null);

  const showCountDown = async () => {
    let innerCount = 6;
    return new Promise<void>(resolve => {
      let interval = setInterval(() => {
        innerCount--;
        setCount(innerCount);
        if (innerCount === 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

  const onComplete = async () => {
    try {
      const data = new FormData();
      data.append('challengeId', challenge.id);
      data.append('authorId', 1);
      data.append('video', {
        uri: videoPath,
        type: 'mp4',
        name: 'name',
      });
      setUploading(true);
      const res = await fetch(getUrl('/api/posts'), {
        method: 'POST',
        body: data,
        headers: {
          Authorization: 'jurgisCodesMobile',
          'Content-Type': 'multipart/form-data; ',
        },
      });
      const json = await res.json();
      console.log(json);
      navigation.navigate('success', {data: json});
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'feed'}, {name: 'success', params: {data: json}}],
      // });
    } catch (err) {
      console.log('--------------------------');
      console.log(err);
    }
  };

  const startRecording = useCallback(async () => {
    if (!isRecording) {
      await showCountDown();
      setIsRecording(true);
    } else {
      setIsRecording(false);
      finishRecording();
    }
  }, [isRecording]);

  const startRecordingOnProgress = () => {
    console.log('progress');
    if (recording) {
      return;
    }
    setRecording(true);
    cameraRef.current?.startRecording({
      onRecordingFinished: async video => {
        setVideo(video.path);
      },
      onRecordingError: error => console.error(error),
    });

    cameraRef.current;
  };

  const finishRecording = async () => {
    await cameraRef.current?.stopRecording();
    setRecording(false);
    setIsRecording(false);
  };

  const onPlay = () => {
    // @ts-ignore
    mainPlayer.current?.seek(0);

    // @ts-ignore
    smallPlayer.current?.seek(0);
    setPaused(false);
  };

  const resetToStart = () => {
    setPaused(true);
  };

  const resetVideo = () => {
    setVideo('');
  };

  if (!device) {
    return <Text style={textStyles.text}>No camera found</Text>;
  }

  if (uploading) {
    return <UploadingScreen />;
  }
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/down.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{challenge.title}</Text>
        <View style={{width: 50}} />
      </View>
      {count ? (
        <View style={styles.count}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      ) : null}

      {videoPath ? (
        <View style={styles.videoWrap}>
          <Video
            ref={mainPlayer}
            source={{
              uri: videoPath,
            }}
            paused={paused}
            resizeMode="cover"
            style={styles.demoVideo}
            onEnd={resetToStart}
          />
          <Video
            ref={smallPlayer}
            source={{
              uri: getUrl(`/media/${challenge.videoId}.mp4`),
            }}
            paused={paused}
            resizeMode="cover"
            style={styles.backgroundVideo}
          />
          {paused ? (
            <TouchableOpacity activeOpacity={0.7} onPress={onPlay}>
              <Image source={require('../../assets/play.png')} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <View style={styles.videoWrap}>
          <TouchableOpacity
            style={swapped ? styles.smallCamera : StyleSheet.absoluteFill}
            activeOpacity={swapped ? 0.7 : 1}
            onPress={() => {
              console.log('swap');
              swapped && setSwapped(false);
            }}>
            <Camera
              ref={cameraRef}
              style={{
                left: -2,
                right: 0,
                top: -2,
                bottom: 0,
                position: 'absolute',
              }}
              resizeMode="cover"
              device={device}
              isActive={true}
              format={format}
              video
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={swapped ? StyleSheet.absoluteFill : styles.smallCamera}
            activeOpacity={!swapped ? 0.7 : 1}
            onPress={() => !swapped && setSwapped(true)}>
            <Video
              source={{
                uri: getUrl(`/media/${challenge.videoId}.mp4`),
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
              ref={currentVideoRef}
              paused={!isRecording}
              onProgress={startRecordingOnProgress}
              onEnd={finishRecording}
            />
          </TouchableOpacity>
        </View>
      )}
      {videoPath ? (
        <View style={styles.btnWrap}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              resetVideo();
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Retry</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => onComplete()}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={startRecording}>
          <View style={styles.recordingBtn}>
            {isRecording ? <View style={styles.recordingInner} /> : null}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: userColors.text,
    fontSize: 17,
    fontWeight: '500',
  },
  count: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: userColors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCamera: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: overlayVideoWidth,
    height: overlayVideoWidth * 1.3333,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
    zIndex: 999,
  },
  largePlayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: width,
    height,
  },
  countText: {
    color: userColors.text,
    fontSize: 200,
  },
  recordingBtn: {
    width: 92,
    height: 92,
    borderRadius: 92,
    borderWidth: 3,
    borderColor: '#FFF',
    // backgroundColor: 'tomato',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingInner: {
    backgroundColor: '#FC443A',
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  videoWrap: {
    width,
    height,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: overlayVideoWidth,
    height: overlayVideoWidth * 1.3333,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'azure',
  },
  demoVideo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  btn: {
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    paddingTop: 13,
    paddingBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  btnText: {
    fontWeight: '500',
    fontSize: 22,
    color: userColors.text,
    textAlign: 'center',
  },
  btnWrap: {
    gap: 16,
  },
});
