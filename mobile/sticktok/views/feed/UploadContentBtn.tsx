import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {userColors} from '../../lib/colors';
import React from 'react';

export const UploadContentBtn = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('select')}
        activeOpacity={0.8}
        style={styles.btnPosition}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Start Challenge</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    top: Dimensions.get('screen').height - 150,
    left: 0,
    right: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  btnPosition: {
    backgroundColor: userColors.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    zIndex: 99,
  },
  btn: {
    // height: 50,
    paddingTop: 13,
    paddingBottom: 16,
  },
  btnText: {
    color: userColors.text,
    fontSize: 27,
    fontWeight: '600',
  },
});
