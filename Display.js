import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING } from './theme';

// Shows the running expression (small) and the current value (large).
export default function Display({ expression, value, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.displayBg }]}>
      <Text style={[styles.expression, { color: theme.subText }]} numberOfLines={1}>
        {expression || ' '}
      </Text>
      <Text
        style={[styles.value, { color: theme.text }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: SPACING * 1.5,
    marginBottom: SPACING,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 130,
  },
  expression: {
    fontSize: 20,
    marginBottom: 4,
  },
  value: {
    fontSize: 56,
    fontWeight: '300',
    width: '100%',
    textAlign: 'right',
  },
});
