import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import { BORDER_RADIUS } from "./Onboarding"

const {width, height} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;
interface SlideProps {
  title: string;
  right?: boolean;
  picture: number;
}

const Slide = ({title: label, right, picture}: SlideProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.underlay}>
        <Image source={picture} style={styles.picture} />
      </View>
      <View style={right ? styles.titleContainerRight : styles.titleContainer}>
        <Text style={styles.title}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    overflow: 'hidden',
    borderBottomRightRadius: BORDER_RADIUS,
  },
  titleContainer: {
    transform: [
      {translateY: (SLIDE_HEIGHT - 100) / 2},
      {translateX: (1 * width) / 2 - 60},
      {rotate: '-90deg'},
    ],
  },
  titleContainerRight: {
    transform: [
      {translateY: (SLIDE_HEIGHT - 100) / 2},
      {translateX: (-1 * width) / 2 + 60},
      {rotate: '90deg'},
    ],
  },
  title: {
    fontSize: 60,
    fontFamily: 'SFProText-Bold',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  underlay: {
      ...StyleSheet.absoluteFillObject, 
      justifyContent: 'flex-end'
  },
  picture: {
      ...StyleSheet.absoluteFillObject,
      width: undefined,
      height: undefined,
      //transform: [{scale: .75}]
  }
});

export default Slide;
