import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {userColors} from '../../lib/colors';

export const UploadingScreen = () => {
  return (
    <View style={styles.wrapper}>
      <AnimatedLottieView
        source={require('../../assets/success.json')}
        autoPlay
        style={styles.animation}
      />
      <View>
        <Text style={styles.header}>Great moves! </Text>
        <Text style={styles.sub}>Calculating score</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  animation: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width - 100,
    marginBottom: 20,
  },
  header: {
    color: userColors.text,
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  sub: {
    color: userColors.text,
    fontSize: 22,
    textAlign: 'center',
  },
});
