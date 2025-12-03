import React, { useState, useCallback } from "react";
import { View, StyleSheet, Platform, Linking, Pressable } from "react-native";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface LocationData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  speed: number | null;
  timestamp: string;
  accuracy: number | null;
}

export default function LocationScreen() {
  const { theme, isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permission, requestPermission] = Location.useForegroundPermissions();
  const buttonScale = useSharedValue(1);

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        altitude: loc.coords.altitude,
        speed: loc.coords.speed,
        timestamp: formatTimestamp(loc.timestamp),
        accuracy: loc.coords.accuracy,
      });
    } catch (err) {
      setError("Failed to get location. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.96, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const openSettings = async () => {
    try {
      if (Platform.OS !== "web") {
        await Linking.openSettings();
      }
    } catch (e) {
      console.log("Cannot open settings");
    }
  };

  if (!permission) {
    return (
      <ScreenScrollView>
        <View style={styles.centerContainer}>
          <Feather name="loader" size={48} color={colors.primaryBlue} />
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        </View>
      </ScreenScrollView>
    );
  }

  if (!permission.granted) {
    if (permission.status === "denied" && !permission.canAskAgain) {
      return (
        <ScreenScrollView>
          <View style={styles.centerContainer}>
            <View
              style={[
                styles.errorBanner,
                { backgroundColor: colors.errorBackground },
              ]}
            >
              <Feather
                name="alert-circle"
                size={20}
                color={colors.error}
                style={styles.errorIcon}
              />
              <ThemedText
                style={[styles.errorText, { color: colors.error }]}
              >
                Location permission is required to use this feature.
              </ThemedText>
            </View>
            {Platform.OS !== "web" && (
              <AnimatedPressable
                onPress={openSettings}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                  styles.button,
                  { backgroundColor: colors.primaryBlue },
                  buttonAnimatedStyle,
                ]}
              >
                <ThemedText style={styles.buttonText}>Open Settings</ThemedText>
              </AnimatedPressable>
            )}
          </View>
        </ScreenScrollView>
      );
    }

    return (
      <ScreenScrollView>
        <View style={styles.centerContainer}>
          <Feather name="map-pin" size={64} color={colors.primaryBlue} />
          <ThemedText type="h4" style={styles.permissionTitle}>
            Location Access Required
          </ThemedText>
          <ThemedText
            style={[styles.permissionText, { color: colors.secondaryText }]}
          >
            Enable location access to view GPS coordinates, altitude, and speed.
          </ThemedText>
          <AnimatedPressable
            onPress={requestPermission}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
              styles.button,
              { backgroundColor: colors.primaryBlue },
              buttonAnimatedStyle,
            ]}
          >
            <ThemedText style={styles.buttonText}>Enable Location</ThemedText>
          </AnimatedPressable>
        </View>
      </ScreenScrollView>
    );
  }

  return (
    <ScreenScrollView>
      {error ? (
        <View
          style={[
            styles.errorBanner,
            { backgroundColor: colors.errorBackground },
          ]}
        >
          <Feather
            name="alert-circle"
            size={20}
            color={colors.error}
            style={styles.errorIcon}
          />
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            {error}
          </ThemedText>
        </View>
      ) : null}

      <AnimatedPressable
        onPress={getLocation}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={loading}
        style={[
          styles.button,
          { backgroundColor: colors.primaryBlue, opacity: loading ? 0.7 : 1 },
          buttonAnimatedStyle,
        ]}
      >
        <Feather
          name={loading ? "loader" : "refresh-cw"}
          size={20}
          color="#FFFFFF"
          style={styles.buttonIcon}
        />
        <ThemedText style={styles.buttonText}>
          {loading ? "Getting Location..." : "Update Location"}
        </ThemedText>
      </AnimatedPressable>

      {location ? (
        <View style={styles.dataContainer}>
          <View style={styles.gridRow}>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightBlue }]}
            >
              <ThemedText
                style={[styles.dataLabel, { color: colors.secondaryText }]}
              >
                Lintang (Latitude)
              </ThemedText>
              <ThemedText
                style={[styles.dataValue, { color: colors.primaryBlue }]}
              >
                {location.latitude.toFixed(6)}°
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightBlue }]}
            >
              <ThemedText
                style={[styles.dataLabel, { color: colors.secondaryText }]}
              >
                Bujur (Longitude)
              </ThemedText>
              <ThemedText
                style={[styles.dataValue, { color: colors.primaryBlue }]}
              >
                {location.longitude.toFixed(6)}°
              </ThemedText>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightBlue }]}
            >
              <ThemedText
                style={[styles.dataLabel, { color: colors.secondaryText }]}
              >
                Ketinggian (Altitude)
              </ThemedText>
              <ThemedText
                style={[styles.dataValue, { color: colors.primaryBlue }]}
              >
                {location.altitude !== null
                  ? `${location.altitude.toFixed(1)} m`
                  : "N/A"}
              </ThemedText>
            </View>
            <View
              style={[styles.dataCard, { backgroundColor: colors.lightBlue }]}
            >
              <ThemedText
                style={[styles.dataLabel, { color: colors.secondaryText }]}
              >
                Kecepatan (Speed)
              </ThemedText>
              <ThemedText
                style={[styles.dataValue, { color: colors.primaryBlue }]}
              >
                {location.speed !== null
                  ? `${location.speed.toFixed(2)} m/s`
                  : "N/A"}
              </ThemedText>
            </View>
          </View>
          <View
            style={[
              styles.dataCard,
              styles.fullWidth,
              { backgroundColor: colors.lightBlue },
            ]}
          >
            <ThemedText
              style={[styles.dataLabel, { color: colors.secondaryText }]}
            >
              Waktu (Timestamp)
            </ThemedText>
            <ThemedText
              style={[styles.dataValue, { color: colors.primaryBlue }]}
            >
              {location.timestamp}
            </ThemedText>
          </View>
          {location.accuracy !== null ? (
            <View
              style={[
                styles.dataCard,
                styles.fullWidth,
                { backgroundColor: colors.lightBlue },
              ]}
            >
              <ThemedText
                style={[styles.dataLabel, { color: colors.secondaryText }]}
              >
                Akurasi (Accuracy)
              </ThemedText>
              <ThemedText
                style={[styles.dataValue, { color: colors.primaryBlue }]}
              >
                {location.accuracy.toFixed(1)} m
              </ThemedText>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Feather name="map-pin" size={64} color={colors.labelText} />
          <ThemedText
            style={[styles.emptyText, { color: colors.secondaryText }]}
          >
            Tap the button above to get your current location
          </ThemedText>
        </View>
      )}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["5xl"],
  },
  loadingText: {
    marginTop: Spacing.lg,
  },
  permissionTitle: {
    marginTop: Spacing.xl,
    textAlign: "center",
  },
  permissionText: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  buttonIcon: {
    marginRight: Spacing.sm,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.lg,
  },
  errorIcon: {
    marginRight: Spacing.sm,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
  },
  dataContainer: {
    gap: Spacing.lg,
  },
  gridRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  dataCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  fullWidth: {
    flex: undefined,
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  dataValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["5xl"],
  },
  emptyText: {
    marginTop: Spacing.lg,
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
});
