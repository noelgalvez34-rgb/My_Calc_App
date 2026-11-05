import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { SPACING } from './theme';

// type: 'number' | 'operator' | 'clear' | 'equals'
export default function CalcButton({ label, type, wide, onPress, theme }) {
  const bg = theme[`${type}Btn`];
  const bgPressed = theme[`${type}BtnPressed`];
  const textColor = theme[`${type}Text`];

  return (
    // The cell gives every button the same gap in the grid.
    <View style={[styles.cell, wide && styles.wideCell]}>
      <Pressable
        onPress={() => onPress(label)}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? bgPressed : bg },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '25%',
    aspectRatio: 1,
    padding: SPACING / 2,
  },
  wideCell: {
    width: '100%',
    aspectRatio: undefined,
    height: 72,
  },
  button: {
    flex: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    transform: [{ scale: 0.96 }],
  },
  label: {
    fontSize: 28,
    fontWeight: '600',
  },
});
