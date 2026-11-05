import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Display from './Display';
import CalcButton from './CalcButton';
import History from './History';
import { lightTheme, darkTheme, SPACING } from './theme';

// Button definitions. The grid is built from this array with .map()
const BUTTONS = [
  { label: 'C', type: 'clear', wide: true },
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '÷', type: 'operator' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '×', type: 'operator' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '−', type: 'operator' },
  { label: '0', type: 'number' },
  { label: '.', type: 'number' },
  { label: '=', type: 'equals' },
  { label: '+', type: 'operator' },
];

const OPERATORS = ['+', '−', '×', '÷'];

// Plain arithmetic, no eval().
function calculate(a, b, op) {
  switch (op) {
    case '+':
      return a + b;
    case '−':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

function format(n) {
  if (!Number.isFinite(n)) return 'Error';
  return String(parseFloat(n.toFixed(10)));
}

export default function Calculator() {
  const scheme = useColorScheme(); // Bonus: dark mode
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const [current, setCurrent] = useState('0'); // value being typed / shown
  const [previous, setPrevious] = useState(null); // stored left operand (number)
  const [operator, setOperator] = useState(null);
  const [startNew, setStartNew] = useState(false); // next digit replaces current
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const expression =
    previous !== null && operator ? `${format(previous)} ${operator}` : '';

  const clear = () => {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
    setStartNew(false);
  };

  const pressNumber = (label) => {
    if (current === 'Error') {
      setCurrent(label === '.' ? '0.' : label);
      setStartNew(false);
      return;
    }
    if (startNew) {
      setCurrent(label === '.' ? '0.' : label);
      setStartNew(false);
      return;
    }
    if (label === '.') {
      if (!current.includes('.')) setCurrent(current + '.');
      return;
    }
    setCurrent(current === '0' ? label : current + label);
  };

  const pressOperator = (label) => {
    if (current === 'Error') return;
    // Pressed an operator right after another one: just swap it.
    if (startNew && operator) {
      setOperator(label);
      return;
    }
    const value = parseFloat(current);
    if (previous !== null && operator) {
      // Chain: 2 + 3 + ... computes 5 first.
      const result = calculate(previous, value, operator);
      if (Number.isNaN(result)) {
        setCurrent('Error');
        setPrevious(null);
        setOperator(null);
        setStartNew(true);
        return;
      }
      setPrevious(result);
      setCurrent(format(result));
    } else {
      setPrevious(value);
    }
    setOperator(label);
    setStartNew(true);
  };

  const pressEquals = () => {
    if (previous === null || !operator || current === 'Error') return;
    const value = parseFloat(current);
    const result = calculate(previous, value, operator);
    const resultText = format(result);
    setHistory((h) => [
      {
        id: Date.now(),
        expression: `${format(previous)} ${operator} ${format(value)}`,
        result: resultText,
      },
      ...h,
    ]);
    setCurrent(resultText);
    setPrevious(null);
    setOperator(null);
    setStartNew(true);
  };

  const handlePress = (label) => {
    if (label === 'C') clear();
    else if (label === '=') pressEquals();
    else if (OPERATORS.includes(label)) pressOperator(label);
    else pressNumber(label);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Pressable onPress={() => setShowHistory((s) => !s)} style={styles.toggle}>
        <Text style={[styles.toggleText, { color: theme.operatorBtn }]}>
          {showHistory ? 'Hide history' : 'Show history'}
        </Text>
      </Pressable>

      {showHistory && <History items={history} theme={theme} />}

      <Display expression={expression} value={current} theme={theme} />

      <View style={styles.grid}>
        {BUTTONS.map((b) => (
          <CalcButton
            key={b.label}
            label={b.label}
            type={b.type}
            wide={b.wide}
            theme={theme}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SPACING,
    paddingTop: 56,
  },
  toggle: {
    alignSelf: 'flex-end',
    padding: SPACING / 2,
    marginBottom: SPACING / 2,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
