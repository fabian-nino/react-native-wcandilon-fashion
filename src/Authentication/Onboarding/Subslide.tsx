import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Button from "../../components/Button"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 34,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 14,
    color: '#0C0D34',
  },

  description: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#0C0D34',
    marginBottom: 40,
  },
});

interface SubslideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const Subslide = ({subtitle, description, last, onPress}: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button 
        label={last ? "Let's get started" : "Next"} 
        variant={last ? "primary" : "default"} 
        {...{onPress}}
      />
    </View>
  );
};

export default Subslide;
