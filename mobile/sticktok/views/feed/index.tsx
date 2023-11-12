import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {UploadContentBtn} from './UploadContentBtn';
import {FeedContent} from './FeedContent';

export const Feed = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.view}>
      <FeedContent />
      <UploadContentBtn navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    height: Dimensions.get('screen').height,
  },
});
