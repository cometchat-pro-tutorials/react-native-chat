import React from 'react';
import { 
  StyleSheet,
  Image 
} from 'react-native';

export function StyledImage(props) {
  return (
    <Image {...props} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 160,
    resizeMode: 'contain',
    marginTop: 5,
  },
});