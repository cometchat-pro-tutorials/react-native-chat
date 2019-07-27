import React from 'react';
import { 
  StyleSheet,
  Text 
} from 'react-native';

export function StyledBlueText(props) {
  return (
    <Text {...props} style={styles.blueText} />
  );
}

export function StyledHelpText(props) {
  return (
    <Text {...props} style={styles.helpText} />
  );
}

const styles = StyleSheet.create({
  blueText: {
    fontSize: 28,
    color: '#1B47DB',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  helpText: {
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
});
