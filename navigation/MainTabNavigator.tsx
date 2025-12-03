import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import LocationScreen from "@/screens/LocationScreen";
import MotionScreen from "@/screens/MotionScreen";
import CompassScreen from "@/screens/CompassScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type MainTabParamList = {
  LocationTab: undefined;
  MotionTab: undefined;
  CompassTab: undefined;
  SettingsTab: undefined;
};

export type LocationStackParamList = {
  Location: undefined;
};

export type MotionStackParamList = {
  Motion: undefined;
};

export type CompassStackParamList = {
  Compass: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const LocationStack = createNativeStackNavigator<LocationStackParamList>();
const MotionStack = createNativeStackNavigator<MotionStackParamList>();
const CompassStack = createNativeStackNavigator<CompassStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function LocationStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <LocationStack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <LocationStack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Sensor App" />,
        }}
      />
    </LocationStack.Navigator>
  );
}

function MotionStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <MotionStack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <MotionStack.Screen
        name="Motion"
        component={MotionScreen}
        options={{
          headerTitle: "Motion",
        }}
      />
    </MotionStack.Navigator>
  );
}

function CompassStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <CompassStack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <CompassStack.Screen
        name="Compass"
        component={CompassScreen}
        options={{
          headerTitle: "Compass",
        }}
      />
    </CompassStack.Navigator>
  );
}

function SettingsStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <SettingsStack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
    </SettingsStack.Navigator>
  );
}

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="LocationTab"
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="LocationTab"
        component={LocationStackNavigator}
        options={{
          title: "Location",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map-pin" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MotionTab"
        component={MotionStackNavigator}
        options={{
          title: "Motion",
          tabBarIcon: ({ color, size }) => (
            <Feather name="activity" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CompassTab"
        component={CompassStackNavigator}
        options={{
          title: "Compass",
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
