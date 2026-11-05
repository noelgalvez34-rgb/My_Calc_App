import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SPACING } from './theme';

// Bonus: list of past calculations (newest first).
export default function History({ items, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.displayBg }]}>
      <Text style={[styles.title, { color: theme.subText }]}>History</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.subText }]}>No calculations yet</Text>
        }
        renderItem={({ item }) => (
          <Text style={[styles.row, { color: theme.text }]}>
            {item.expression} = {item.result}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: SPACING,
    marginBottom: SPACING,
    height: 120,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  row: {
    fontSize: 16,
    paddingVertical: 2,
  },
  empty: {
    fontSize: 14,
  },
});
