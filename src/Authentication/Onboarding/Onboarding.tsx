import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  useValue,
  onScrollEvent,
  interpolateColor,
  useScrollHandler,
} from 'react-native-redash';
import Slide, {SLIDE_HEIGHT} from './Slide';
import Subslide from './Subslide';
import PageIndicator from './PageIndicator';
import Animated, {multiply, divide} from 'react-native-reanimated';

export const BORDER_RADIUS = 75;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    height: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const slides = [
  {
    title: 'Relaxed',
    subtitle: 'Find Your outfits',
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: '#BFEAF5',
    picture: require("../../../assets/bear.png")
  },
  {
    title: 'Playful',
    subtitle: 'Heat it First, Wear it First',
    description:
      'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
    color: '#BEECC4',
    picture: require("../../../assets/rogue.png")
  },
  {
    title: 'Excentric',
    subtitle: 'Your Style, Your Way',
    description:
      'Create your individual & unique style and look amazing everyday',
    color: '#FFE4D9',
    picture: require("../../../assets/mage.png")
  },
  {
    title: 'Funky',
    subtitle: 'Look Good, Feel Good',
    description:
      'Discover the latest trends in fashion and explore your personality',
    color: '#FFDDDD',
    picture: require("../../../assets/knigt.png")
  },
];
interface Onboarding {}

const Onboarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const {scrollHandler, x} = useScrollHandler();
  const onScroll = onScrollEvent({x});
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={{...styles.slider, backgroundColor: backgroundColor}}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          //scrollEventThrottle={1}
          {...scrollHandler}>
          {slides.map(({title, picture}, index) => (
            <Slide key={index} {...{title, picture}} right={!!(index % 2)} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
           backgroundColor,
          }}></Animated.View>
        <View style={styles.footerContent}>
          <View style={{...styles.pagination}}>
            {slides.map((_, index) => (
              <PageIndicator key={index} index={index} currentIndex={divide(x, width)} />
            ))}
          </View>
          <Animated.View style={{
              flex: 1, flexDirection: "row", transform: [{translateX: multiply(x, -1)}], width: width * slides.length
          }}>
            {slides.map(({subtitle, description}, index) => (
              <Subslide
                key={index}
                onPress={() => {
                  if (scroll.current) {
                    scroll.current
                      .getNode()
                      .scrollTo({x: width * index, animated: true});
                  }
                }}
                last={index === slides.length - 1}
                {...{subtitle, description}}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
