# React Native Calculator

A simple calculator built with React Native and Expo for the "Simple React Native UI Activity".

## What it does

- Shows the running expression and the current value on a display
- Buttons for 0-9, a decimal point, the operators `+ − × ÷`, equals `=`, and Clear `C`
- Chains operations (e.g. `2 + 3 + 4`) and shows `Error` on division by zero
- Buttons change color while pressed
- **Bonus:** dark mode via `useColorScheme`
- **Bonus:** calculation history list (tap "Show history")

## Components

| File | Purpose |
| --- | --- |
| `App.js` | Entry point |
| `Calculator.js` | Holds state (`useState`), handles taps, builds the button grid with `.map()` |
| `Display.js` | Shows the expression and value (receives them as props) |
| `CalcButton.js` | One `Pressable` button (receives label, type, theme, `onPress` as props) |
| `History.js` | `FlatList` of past calculations |
| `theme.js` | Light and dark colors and spacing |

All styles use `StyleSheet.create()`, the grid uses Flexbox (`flexDirection: 'row'`, `flexWrap: 'wrap'`), and no `eval()` or UI libraries are used.

## How to run

```bash
npx create-expo-app MyApp
cd MyApp

npx expo start
```

Then scan the QR code with **Expo Go** on your phone, or press `a` / `i` to open an emulator.

## Screenshot

Add your screenshot here (for example `screenshot.png`).
