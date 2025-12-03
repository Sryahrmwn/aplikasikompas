# Sensor App

A mobile sensor application built with Expo React Native that displays real-time GNSS/GPS location, IMU sensors (accelerometer/gyroscope), and digital compass data.

## Overview

This app demonstrates native device sensor capabilities including:
- **GPS/GNSS Location**: Real-time latitude, longitude, altitude, speed, and accuracy
- **IMU Sensors**: Accelerometer (X, Y, Z) and Gyroscope (Alpha, Beta, Gamma)
- **Digital Compass**: Visual compass with animated needle and cardinal directions

## Recent Changes

- **Dec 3, 2025**: Initial implementation
  - Created 4-tab navigation (Location, Motion, Compass, Settings)
  - Implemented real-time GPS location tracking with permission handling
  - Added accelerometer and gyroscope sensor displays
  - Built animated compass with magnetometer integration
  - Created settings screen with user preferences

## Project Architecture

### Navigation Structure
```
MainTabNavigator (4 tabs)
├── LocationTab → LocationStackNavigator → LocationScreen
├── MotionTab → MotionStackNavigator → MotionScreen
├── CompassTab → CompassStackNavigator → CompassScreen
└── SettingsTab → SettingsStackNavigator → SettingsScreen
```

### Key Files
- `/screens/LocationScreen.tsx` - GPS/GNSS data display with permission handling
- `/screens/MotionScreen.tsx` - Accelerometer and gyroscope real-time data
- `/screens/CompassScreen.tsx` - Animated digital compass
- `/screens/SettingsScreen.tsx` - User preferences (units, frequency, haptics)
- `/navigation/MainTabNavigator.tsx` - Tab navigation with stack navigators
- `/constants/theme.ts` - Design system colors and typography
- `/design_guidelines.md` - Complete design specifications

### Dependencies
- `expo-location` - GPS/GNSS functionality
- `expo-sensors` - Accelerometer, Gyroscope, Magnetometer
- `expo-haptics` - Haptic feedback
- `react-native-reanimated` - Smooth animations
- `@expo/vector-icons` - Feather icons

## User Preferences

- Display name customization
- Unit system toggle (Metric/Imperial)
- Sensor update frequency (Real-time, 1s, 2s)
- Haptic feedback toggle

## Running the App

The app runs automatically via Expo. Scan the QR code with Expo Go to test on a physical device with real sensor data.

**Note**: Some sensors (accelerometer, gyroscope, magnetometer) require a physical mobile device to function. On web, a fallback message is displayed.
