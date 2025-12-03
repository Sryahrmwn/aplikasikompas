import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Magnetometer } from "expo-sensors";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";

const DIRECTIONS = [
  "Utara",
  "Timur Laut",
  "Timur",
  "Tenggara",
  "Selatan",
  "Barat Daya",
  "Barat",
  "Barat Laut",
];

export default function CompassScreen() {
  const { theme, isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const [heading, setHeading] = useState<number | null>(null);
  const [magnetometerAvailable, setMagnetometerAvailable] = useState(true);
  const rotation = useSharedValue(0);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const setupMagnetometer = async () => {
      const isAvailable = await Magnetometer.isAvailableAsync();
      setMagnetometerAvailable(isAvailable);

      if (isAvailable) {
        Magnetometer.setUpdateInterval(50);
        subscription = Magnetometer.addListener((data) => {
          let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
          angle = (angle + 360) % 360;
          angle = (360 - angle) % 360;

          setHeading(Math.round(angle));
          rotation.value = withSpring(-angle, {
            damping: 10,
            stiffness: 100,
            mass: 0.5,
          });
        });
      }
    };

    setupMagnetometer();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [rotation]);

  const getDirection = (degrees: number): string => {
    const index = Math.round(degrees / 45) % 8;
    return DIRECTIONS[index];
  };

  const needleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (!magnetometerAvailable) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.backgroundRoot,
            paddingTop: headerHeight + Spacing.xl,
            paddingBottom: tabBarHeight + Spacing.xl,
          },
        ]}
      >
        <View style={styles.unavailableContainer}>
          <Feather name="compass" size={64} color={colors.labelText} />
          <ThemedText type="h4" style={styles.unavailableTitle}>
            Compass Not Available
          </ThemedText>
          <ThemedText
            style={[styles.unavailableText, { color: colors.secondaryText }]}
          >
            {Platform.OS === "web"
              ? "Run in Expo Go to use this feature."
              : "This device does not have a magnetometer sensor."}
          </ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundRoot,
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: tabBarHeight + Spacing.xl,
        },
      ]}
    >
      <View style={styles.compassContainer}>
        <View
          style={[styles.compassRing, { borderColor: colors.lightPurple }]}
        >
          <Animated.View style={[styles.needleContainer, needleAnimatedStyle]}>
            <View style={[styles.needle, { backgroundColor: colors.error }]} />
            <View
              style={[
                styles.needleSouth,
                { backgroundColor: colors.secondaryText },
              ]}
            />
          </Animated.View>

          <View
            style={[styles.centerDot, { backgroundColor: colors.primaryPurple }]}
          />

          <ThemedText
            style={[
              styles.cardinalLabel,
              styles.north,
              { color: colors.primaryPurple },
            ]}
          >
            U
          </ThemedText>
          <ThemedText
            style={[
              styles.cardinalLabel,
              styles.south,
              { color: colors.secondaryText },
            ]}
          >
            S
          </ThemedText>
          <ThemedText
            style={[
              styles.cardinalLabel,
              styles.east,
              { color: colors.secondaryText },
            ]}
          >
            T
          </ThemedText>
          <ThemedText
            style={[
              styles.cardinalLabel,
              styles.west,
              { color: colors.secondaryText },
            ]}
          >
            B
          </ThemedText>
        </View>
      </View>

      <View
        style={[
          styles.headingCard,
          { backgroundColor: colors.lightPurple },
        ]}
      >
        <ThemedText
          style={[styles.headingValue, { color: colors.primaryPurple }]}
        >
          {heading !== null ? `${heading}°` : "--°"}
        </ThemedText>
        <ThemedText
          style={[styles.directionText, { color: theme.text }]}
        >
          {heading !== null ? getDirection(heading) : "Calibrating..."}
        </ThemedText>
      </View>

      <View style={styles.hintContainer}>
        <Feather name="info" size={16} color={colors.labelText} />
        <ThemedText style={[styles.hintText, { color: colors.labelText }]}>
          Move device in a figure-8 pattern to calibrate
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  unavailableContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
  },
  unavailableTitle: {
    marginTop: Spacing.xl,
    textAlign: "center",
  },
  unavailableText: {
    marginTop: Spacing.sm,
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
  compassContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing["2xl"],
  },
  compassRing: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  needleContainer: {
    position: "absolute",
    width: 4,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  needle: {
    position: "absolute",
    top: 16,
    width: 4,
    height: 64,
    borderRadius: 2,
  },
  needleSouth: {
    position: "absolute",
    bottom: 16,
    width: 4,
    height: 64,
    borderRadius: 2,
    opacity: 0.5,
  },
  centerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: "absolute",
  },
  cardinalLabel: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "700",
  },
  north: {
    top: 12,
  },
  south: {
    bottom: 12,
  },
  east: {
    right: 12,
  },
  west: {
    left: 12,
  },
  headingCard: {
    width: "100%",
    padding: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  headingValue: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  directionText: {
    fontSize: 18,
    fontWeight: "500",
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  hintText: {
    marginLeft: Spacing.sm,
    fontSize: 13,
    textAlign: "center",
  },
});
