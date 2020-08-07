import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';

const styles = StyleSheet.create({});

interface PageIndicatorProps {
  index: number;
  currentIndex: Animated.Node<number>;
}

const PageIndicator = ({index, currentIndex}: PageIndicatorProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1.25, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      key={index}
      style={{
        backgroundColor: '#2CB9B0',
        borderRadius: 4,
        height: 8,
        width: 8,
        margin: 4,
        opacity,
        transform: [{ scale: scale}],
      }}>
      <Text></Text>
    </Animated.View>
  );
};

export default PageIndicator;
