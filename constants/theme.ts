import { Platform } from "react-native";

const tintColorLight = "#2563EB";
const tintColorDark = "#3B82F6";

export const Colors = {
  light: {
    text: "#1F2937",
    secondaryText: "#6B7280",
    labelText: "#9CA3AF",
    buttonText: "#FFFFFF",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    link: "#2563EB",
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F2F2F7",
    backgroundSecondary: "#E5E7EB",
    backgroundTertiary: "#D1D5DB",
    primaryBlue: "#2563EB",
    primaryGreen: "#059669",
    primaryPurple: "#7C3AED",
    lightBlue: "#DBEAFE",
    lightGreen: "#D1FAE5",
    lightPurple: "#EDE9FE",
    error: "#EF4444",
    errorBackground: "#FEE2E2",
    success: "#10B981",
    gradientStart: "#EFF6FF",
    gradientEnd: "#E0E7FF",
  },
  dark: {
    text: "#ECEDEE",
    secondaryText: "#9CA3AF",
    labelText: "#6B7280",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    link: "#3B82F6",
    backgroundRoot: "#1F2123",
    backgroundDefault: "#2A2C2E",
    backgroundSecondary: "#353739",
    backgroundTertiary: "#404244",
    primaryBlue: "#3B82F6",
    primaryGreen: "#10B981",
    primaryPurple: "#8B5CF6",
    lightBlue: "#1E3A5F",
    lightGreen: "#064E3B",
    lightPurple: "#4C1D95",
    error: "#F87171",
    errorBackground: "#7F1D1D",
    success: "#34D399",
    gradientStart: "#1F2937",
    gradientEnd: "#312E81",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: "700" as const,
  },
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  headline: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  largeValue: {
    fontSize: 48,
    fontWeight: "700" as const,
  },
  value: {
    fontSize: 24,
    fontWeight: "700" as const,
  },
  body: {
    fontSize: 17,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
};
