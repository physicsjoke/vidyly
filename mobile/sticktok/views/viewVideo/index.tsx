import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {userColors} from '../../lib/colors';
import {getUrl} from '../../lib/localFetch';
import Video from 'react-native-video';
import {Challenge} from '../selectChallenge';

const width = Dimensions.get('screen').width;
export const ViewVideo = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {challenge} = route.params as {challenge: Challenge};
  console.log(challenge);
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/down.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{challenge.title}</Text>
        <View style={{width: 50}} />
      </View>
      <View style={styles.card}>
        <Video
          source={{
            uri: getUrl(`/media/${challenge.videoId}.mp4`),
          }}
          repeat
          resizeMode="cover"
          style={styles.backgroundVideo}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('camera', {challenge})}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>I'm ready</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 20,
  },
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  card: {
    width,
    height: width * 1.333333,
    backgroundColor: 'azure',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
