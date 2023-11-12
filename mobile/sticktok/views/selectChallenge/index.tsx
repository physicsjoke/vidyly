import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {userColors} from '../../lib/colors';
import Video from 'react-native-video';
import {getUrl, localFetch} from '../../lib/localFetch';

const width = Dimensions.get('screen').width - 70;
const ratio = 1.33333;

export type Challenge = {
  id: number;
  title: string;
  timestamp: number;
  date: string;
  videoId: string;
  type: string;
};
export const SelectChallenge = ({navigation}: {navigation: any}) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  useEffect(() => {
    localFetch('/api/challenges').then(async res => {
      const data = await res.json();
      setChallenges(data);
    });
  }, []);
  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/down.png')} />
      </TouchableOpacity>
      <View>
        <Text style={styles.header}>Select Challenge</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          {challenges.map(challenge => (
            <TouchableOpacity
              key={challenge.id}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('video', {challenge})}>
              <View style={styles.card} key={challenge.id}>
                <Video
                  source={{
                    uri: getUrl(`/media/${challenge.videoId}.mp4`),
                  }}
                  repeat
                  resizeMode="cover"
                  style={styles.backgroundVideo}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: userColors.text,
    fontWeight: '500',
    fontSize: 28,
    textAlign: 'center',
  },
  scrollView: {
    paddingTop: 30,
    paddingLeft: 35,
  },
  card: {
    width,
    height: width * ratio,
    borderRadius: 20,
    marginBottom: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  viewContainer: {
    flexGrow: 1,
    // flex: 1,
    justifyContent: 'space-around',
  },
  cameraBtn: {
    width: 92,
    height: 92,
    borderRadius: 92,
    borderColor: '#fff',
    borderWidth: 5,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
});
