import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {userColors} from '../../lib/colors';
import Video from 'react-native-video';
import {formatDistanceStrict} from 'date-fns';
import {textStyles} from '../../lib/styles';
import {getUrl, localFetch} from '../../lib/localFetch';

type Post = {
  author: {email: string; id: number; name: string};
  authorId: number;
  challenge: {
    date: string;
    id: number;
    timestamp: number;
    title: string;
    type: string;
    video: {};
    videoId: string;
  };
  challengeId: number;
  id: number;
  reactions: number;
  score: number;
  timestamp: number;
  title: 'First';
  video: {
    id: number;
    path: '/media/85b2d019-654c-44da-9dba-e8bd683efc33.mp4';
    uuid: '85b2d019-654c-44da-9dba-e8bd683efc33';
  };
  videoId: '85b2d019-654c-44da-9dba-e8bd683efc33';
};
const width = Dimensions.get('screen').width;

const ratio = 1.3333333333;

const Card = ({children}: React.PropsWithChildren) => {
  return <View style={styles.card}>{children}</View>;
};
export const FeedContent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const reloadPosts = () => {
    setRefreshing(true);
    try {
      localFetch('/api/posts').then(async res => {
        const data = await res.json();
        setPosts(data);
        console.log(data);
      });
    } catch (err) {}
    setRefreshing(false);
  };
  useEffect(() => {
    reloadPosts();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 150}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={reloadPosts} />
      }>
      <View style={styles.appHeader}>
        <Text style={styles.headerText}>Jurgis</Text>
      </View>
      {posts.map(post => {
        return (
          <Card key={post.id}>
            <Video
              source={{
                uri: getUrl(`/media/${post.videoId}.mp4`),
              }}
              repeat
              resizeMode="cover"
              style={styles.backgroundVideo}
            />
            <View style={styles.videoOverlay}>
              <View style={styles.videoTop}>
                <View>
                  <Text style={styles.postAuthor}>{post.author.name}</Text>
                  <Text style={textStyles.text}>
                    {formatDistanceStrict(post.timestamp * 1000, Date.now())}{' '}
                    ago
                  </Text>
                </View>
                <Text style={styles.score}>{post.score}%</Text>
              </View>
              <View style={styles.videoBottom}>
                <Text style={styles.bottomText}>{post.challenge.title}</Text>
                <View style={styles.emojiWrap}>
                  <Text style={styles.bottomText}>{post.reactions}</Text>
                  <Image source={require('../../assets/emoji.png')} />
                </View>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    alignItems: 'center',
    padding: 12,
  },
  videoOverlay: {
    justifyContent: 'space-between',
    flex: 1,
  },
  videoTop: {
    paddingLeft: 24,
    paddingTop: 19,
    paddingRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoBottom: {
    paddingLeft: 24,
    paddingBottom: 19,
    paddingRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomText: {
    color: userColors.text,
    fontSize: 20,
    fontWeight: '500',
  },
  postAuthor: {
    color: userColors.text,
    fontSize: 20,
    fontWeight: '500',
  },
  headerText: {
    color: userColors.text,
    fontWeight: '500',
    fontSize: 17,
  },
  score: {
    color: userColors.text,
    fontSize: 37,
    fontWeight: '900',
  },
  card: {
    width,
    height: width * ratio,
    backgroundColor: 'wheat',
    borderRadius: 20,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  emojiWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
