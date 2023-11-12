import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {userColors} from '../../lib/colors';
import Video from 'react-native-video';
import {getUrl} from '../../lib/localFetch';
import {ScrollView} from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width - 40;

export const SuccessView = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {data} = route.params;
  //   const data = {
  //     authorId: 1,
  //     challengeId: 5,
  //     id: 19,
  //     reactions: 0,
  //     score: 63,
  //     timestamp: 1699725519,
  //     title: 'Starter',
  //     videoId: 'aa90bf77-dc61-45d6-b2d2-844eb2d12632',
  //   };

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'feed'}],
    });
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={goHome}>
          <Image source={require('../../assets/down.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{data.title}</Text>
        <View style={{width: 50}} />
      </View>
      <ScrollView contentContainerStyle={styles.root}>
        <Text style={styles.heading}>Success</Text>
        <View style={styles.score}>
          <View style={styles.scoresWrap}>
            <Text style={styles.scoreTitle}>{data.score}</Text>
            <Text style={styles.percentage}>%</Text>
          </View>
          <Text style={styles.scoreText}>Your Score</Text>
        </View>
        <View style={styles.card}>
          <Video
            source={{
              uri: getUrl(`/media/${data.videoId}.mp4`),
            }}
            repeat
            resizeMode="cover"
            style={styles.backgroundVideo}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  header: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: userColors.text,
    fontSize: 17,
    fontWeight: '500',
  },
  heading: {
    fontSize: 32,
    marginTop: 10,
    fontWeight: '500',
    color: userColors.text,
    textAlign: 'center',
  },
  score: {
    backgroundColor: '#FC443A',
    width,
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 14,
    marginTop: 15,
    marginBottom: 15,
  },
  scoreTitle: {
    fontSize: 92,
    fontWeight: '900',
  },
  scoresWrap: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  percentage: {
    fontSize: 32,
    fontWeight: '500',
  },
  scoreText: {
    fontSize: 32,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  card: {
    width,
    height: width * 1.333333,
    backgroundColor: 'azure',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
