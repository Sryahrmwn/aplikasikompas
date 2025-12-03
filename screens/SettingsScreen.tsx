import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Switch,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type UpdateFrequency = "realtime" | "1s" | "2s";
type UnitSystem = "metric" | "imperial";

export default function SettingsScreen() {
  const { theme, isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const [displayName, setDisplayName] = useState("User");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [updateFrequency, setUpdateFrequency] =
    useState<UpdateFrequency>("realtime");
  const [hapticEnabled, setHapticEnabled] = useState(true);

  const buttonScale = useSharedValue(1);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.96, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleHapticToggle = (value: boolean) => {
    if (value) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setHapticEnabled(value);
  };

  const handleUnitToggle = () => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setUnitSystem(unitSystem === "metric" ? "imperial" : "metric");
  };

  const handleFrequencyChange = (freq: UpdateFrequency) => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setUpdateFrequency(freq);
  };

  return (
    <ScreenScrollView>
      <View style={styles.profileSection}>
        <View
          style={[styles.avatarContainer, { backgroundColor: colors.lightPurple }]}
        >
          <Feather name="compass" size={40} color={colors.primaryPurple} />
        </View>
        <View style={styles.nameInputContainer}>
          <ThemedText
            style={[styles.inputLabel, { color: colors.secondaryText }]}
          >
            Display Name
          </ThemedText>
          <TextInput
            style={[
              styles.nameInput,
              {
                backgroundColor: colors.backgroundDefault,
                color: theme.text,
                borderColor: colors.backgroundSecondary,
              },
            ]}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your name"
            placeholderTextColor={colors.labelText}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionHeader, { color: colors.secondaryText }]}
        >
          PREFERENCES
        </ThemedText>

        <View
          style={[styles.settingRow, { borderBottomColor: colors.backgroundSecondary }]}
        >
          <View style={styles.settingLabelContainer}>
            <Feather
              name="globe"
              size={20}
              color={colors.primaryBlue}
              style={styles.settingIcon}
            />
            <ThemedText>Units</ThemedText>
          </View>
          <AnimatedPressable
            onPress={handleUnitToggle}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
              styles.toggleButton,
              { backgroundColor: colors.backgroundDefault },
              buttonAnimatedStyle,
            ]}
          >
            <ThemedText
              style={[
                styles.toggleText,
                unitSystem === "metric"
                  ? { color: colors.primaryBlue, fontWeight: "600" }
                  : { color: colors.labelText },
              ]}
            >
              Metric
            </ThemedText>
            <ThemedText style={{ color: colors.labelText }}> / </ThemedText>
            <ThemedText
              style={[
                styles.toggleText,
                unitSystem === "imperial"
                  ? { color: colors.primaryBlue, fontWeight: "600" }
                  : { color: colors.labelText },
              ]}
            >
              Imperial
            </ThemedText>
          </AnimatedPressable>
        </View>

        <View
          style={[styles.settingRow, { borderBottomColor: colors.backgroundSecondary }]}
        >
          <View style={styles.settingLabelContainer}>
            <Feather
              name="clock"
              size={20}
              color={colors.primaryBlue}
              style={styles.settingIcon}
            />
            <ThemedText>Update Frequency</ThemedText>
          </View>
        </View>

        <View style={styles.frequencyContainer}>
          {(["realtime", "1s", "2s"] as UpdateFrequency[]).map((freq) => (
            <Pressable
              key={freq}
              onPress={() => handleFrequencyChange(freq)}
              style={[
                styles.frequencyOption,
                {
                  backgroundColor:
                    updateFrequency === freq
                      ? colors.primaryBlue
                      : colors.backgroundDefault,
                },
              ]}
            >
              <ThemedText
                style={{
                  color:
                    updateFrequency === freq ? "#FFFFFF" : theme.text,
                  fontWeight: updateFrequency === freq ? "600" : "400",
                }}
              >
                {freq === "realtime" ? "Real-time" : freq}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <View
          style={[styles.settingRow, { borderBottomColor: colors.backgroundSecondary }]}
        >
          <View style={styles.settingLabelContainer}>
            <Feather
              name="smartphone"
              size={20}
              color={colors.primaryBlue}
              style={styles.settingIcon}
            />
            <ThemedText>Haptic Feedback</ThemedText>
          </View>
          <Switch
            value={hapticEnabled}
            onValueChange={handleHapticToggle}
            trackColor={{
              false: colors.backgroundSecondary,
              true: colors.primaryBlue,
            }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionHeader, { color: colors.secondaryText }]}
        >
          ABOUT
        </ThemedText>

        <View
          style={[styles.settingRow, { borderBottomColor: colors.backgroundSecondary }]}
        >
          <View style={styles.settingLabelContainer}>
            <Feather
              name="info"
              size={20}
              color={colors.primaryBlue}
              style={styles.settingIcon}
            />
            <ThemedText>Version</ThemedText>
          </View>
          <ThemedText style={{ color: colors.secondaryText }}>1.0.0</ThemedText>
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Feather
              name="cpu"
              size={20}
              color={colors.primaryBlue}
              style={styles.settingIcon}
            />
            <ThemedText>Sensors</ThemedText>
          </View>
          <ThemedText style={{ color: colors.secondaryText }}>
            GPS, IMU, Compass
          </ThemedText>
        </View>
      </View>

      <View style={styles.footer}>
        <ThemedText style={[styles.footerText, { color: colors.labelText }]}>
          Sensor Application Demo
        </ThemedText>
        <ThemedText style={[styles.footerText, { color: colors.labelText }]}>
          GNSS/GPS, IMU Sensors & Digital Compass
        </ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  nameInputContainer: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 13,
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  nameInput: {
    height: 48,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    fontSize: 17,
    textAlign: "center",
    borderWidth: 1,
  },
  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  settingLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: Spacing.md,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xs,
  },
  toggleText: {
    fontSize: 14,
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  frequencyOption: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: 13,
    marginBottom: Spacing.xs,
  },
});
