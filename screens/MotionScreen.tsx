import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";

interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

export default function MotionScreen() {
  const { theme, isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const [accelerometerData, setAccelerometerData] =
    useState<AccelerometerData | null>(null);
  const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData | null>(
    null
  );
  const [accelerometerAvailable, setAccelerometerAvailable] = useState(true);
  const [gyroscopeAvailable, setGyroscopeAvailable] = useState(true);

  const accelX = useSharedValue(0);
  const accelY = useSharedValue(0);
  const accelZ = useSharedValue(0);
  const gyroX = useSharedValue(0);
  const gyroY = useSharedValue(0);
  const gyroZ = useSharedValue(0);

  useEffect(() => {
    let accelSubscription: { remove: () => void } | null = null;
    let gyroSubscription: { remove: () => void } | null = null;

    const setupSensors = async () => {
      const accelIsAvailable = await Accelerometer.isAvailableAsync();
      setAccelerometerAvailable(accelIsAvailable);

      if (accelIsAvailable) {
        Accelerometer.setUpdateInterval(100);
        accelSubscription = Accelerometer.addListener((data) => {
          setAccelerometerData(data);
          accelX.value = withSpring(data.x, { damping: 15, stiffness: 100 });
          accelY.value = withSpring(data.y, { damping: 15, stiffness: 100 });
          accelZ.value = withSpring(data.z, { damping: 15, stiffness: 100 });
        });
      }

      const gyroIsAvailable = await Gyroscope.isAvailableAsync();
      setGyroscopeAvailable(gyroIsAvailable);

      if (gyroIsAvailable) {
        Gyroscope.setUpdateInterval(100);
        gyroSubscription = Gyroscope.addListener((data) => {
          setGyroscopeData(data);
          gyroX.value = withSpring(data.x, { damping: 15, stiffness: 100 });
          gyroY.value = withSpring(data.y, { damping: 15, stiffness: 100 });
          gyroZ.value = withSpring(data.z, { damping: 15, stiffness: 100 });
        });
      }
    };

    setupSensors();

    return () => {
      if (accelSubscription) {
        accelSubscription.remove();
      }
      if (gyroSubscription) {
        gyroSubscription.remove();
      }
    };
  }, [accelX, accelY, accelZ, gyroX, gyroY, gyroZ]);

  const formatValue = (value: number | undefined): string => {
    if (value === undefined) return "0.00";
    return (value * 9.81).toFixed(2);
  };

  const formatGyroValue = (value: number | undefined): string => {
    if (value === undefined) return "0.00";
    return ((value * 180) / Math.PI).toFixed(2);
  };

  const renderSensorUnavailable = (sensorName: string) => (
    <View style={styles.unavailableContainer}>
      <Feather name="alert-circle" size={24} color={colors.labelText} />
      <ThemedText style={[styles.unavailableText, { color: colors.labelText }]}>
        {sensorName} not available
        {Platform.OS === "web"
          ? ". Run in Expo Go to use this feature."
          : " on this device."}
      </ThemedText>
    </View>
  );

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather
            name="activity"
            size={24}
            color={colors.primaryGreen}
            style={styles.sectionIcon}
          />
          <ThemedText type="h4">Accelerometer (m/s²)</ThemedText>
        </View>

        {accelerometerAvailable && accelerometerData ? (
          <View style={styles.gridRow}>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                X
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                {formatValue(accelerometerData.x)}
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Y
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                {formatValue(accelerometerData.y)}
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Z
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                {formatValue(accelerometerData.z)}
              </ThemedText>
            </View>
          </View>
        ) : accelerometerAvailable ? (
          <View style={styles.gridRow}>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                X
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                0.00
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Y
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                0.00
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Z
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                0.00
              </ThemedText>
            </View>
          </View>
        ) : (
          renderSensorUnavailable("Accelerometer")
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather
            name="rotate-cw"
            size={24}
            color={colors.primaryGreen}
            style={styles.sectionIcon}
          />
          <ThemedText type="h4">Gyroscope (°/s)</ThemedText>
        </View>

        {gyroscopeAvailable && gyroscopeData ? (
          <View style={styles.gridRow}>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Alpha
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                {formatGyroValue(gyroscopeData.x)}
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Beta
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                {formatGyroValue(gyroscopeData.y)}
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Gamma
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                {formatGyroValue(gyroscopeData.z)}
              </ThemedText>
            </View>
          </View>
        ) : gyroscopeAvailable ? (
          <View style={styles.gridRow}>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Alpha
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                0.00
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Beta
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                0.00
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightGreen }]}
            >
              <ThemedText
                style={[styles.axisLabel, { color: colors.secondaryText }]}
              >
                Gamma
              </ThemedText>
              <ThemedText
                style={[styles.axisValue, { color: colors.primaryGreen }]}
              >
                0.00
              </ThemedText>
            </View>
          </View>
        ) : (
          renderSensorUnavailable("Gyroscope")
        )}
      </View>

      <View style={styles.hintContainer}>
        <Feather name="info" size={16} color={colors.labelText} />
        <ThemedText style={[styles.hintText, { color: colors.labelText }]}>
          Move your device to see real-time sensor updates
        </ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  sectionIcon: {
    marginRight: Spacing.sm,
  },
  gridRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  dataCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  axisLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  axisValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  unavailableContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  unavailableText: {
    marginLeft: Spacing.sm,
    fontSize: 14,
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xl,
  },
  hintText: {
    marginLeft: Spacing.sm,
    fontSize: 13,
  },
});
