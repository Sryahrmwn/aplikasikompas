# Design Guidelines: Mobile Sensor Application

## Architecture Decisions

### Authentication
**No authentication required.** This is a utility application focused on displaying sensor data for a single user. All functionality is device-local with no backend sync or user accounts.

**Profile/Settings Screen Required:**
- Include a Settings tab with:
  - User-customizable avatar (generate 1 sensor-themed avatar: abstract geometric compass icon)
  - Display name field (default: "User")
  - Preferences:
    - Units toggle (Metric/Imperial for speed and altitude)
    - Update frequency (Real-time, 1s, 2s intervals)
    - Dark/Light theme toggle
    - Haptic feedback toggle

### Navigation Architecture
**Tab Navigation (4 tabs):**
- **Tab 1 - Location** (MapPin icon): GPS/GNSS data display
- **Tab 2 - Motion** (Activity icon): IMU sensors (accelerometer + gyroscope)
- **Tab 3 - Compass** (Compass icon): Digital compass with visual indicator
- **Tab 4 - Settings** (Settings icon): App preferences and user profile

No floating action button needed. Each tab is a distinct sensor view.

## Screen Specifications

### 1. Location Screen (GPS/GNSS)
**Purpose:** Display real-time GPS coordinates, altitude, speed, and timestamp.

**Layout:**
- Header: Default navigation header with title "Location", transparent background
- Main content: ScrollView with vertical padding
- Safe area insets: 
  - Top: headerHeight + Spacing.xl
  - Bottom: tabBarHeight + Spacing.xl

**Components:**
- Primary button: "Update Location" (blue accent color, centered, full-width with horizontal margins)
- Data grid: 2-column grid displaying:
  - Latitude/Longitude cards (decimal degrees format)
  - Altitude card (meters/feet based on settings)
  - Speed card (m/s or mph based on settings)
  - Timestamp card (full-width, 1 column span)
- Each data card: Light blue background, rounded corners, padding, label + large value text
- Empty state: Icon + text when no location data available
- Error banner: Red background banner at top if GPS permission denied

### 2. Motion Screen (IMU Sensors)
**Purpose:** Display accelerometer and gyroscope data in real-time.

**Layout:**
- Header: Default navigation header with title "Motion", transparent background
- Main content: ScrollView with two sections
- Safe area insets:
  - Top: headerHeight + Spacing.xl
  - Bottom: tabBarHeight + Spacing.xl

**Components:**
- Section 1 - Accelerometer:
  - Section header with Activity icon and "Accelerometer (m/s²)" label
  - 3-column grid for X, Y, Z axes
  - Light green background cards with centered values
- Section 2 - Gyroscope:
  - Section header with "Gyroscope (°/s)" label
  - 3-column grid for Alpha, Beta, Gamma rotation rates
  - Light green background cards with centered values
- Each sensor value updates in real-time with smooth number transitions
- Unavailable state: Gray text indicating "Sensor not available on this device"

### 3. Compass Screen
**Purpose:** Display digital compass with visual needle and heading information.

**Layout:**
- Header: Default navigation header with title "Compass", transparent background
- Main content: Centered content view (not scrollable)
- Safe area insets:
  - Top: headerHeight + Spacing.xl
  - Bottom: tabBarHeight + Spacing.xl

**Components:**
- Visual compass circle:
  - 240x240pt circular indicator
  - Light purple border ring (8pt width)
  - Animated red needle rotating to match device heading
  - Cardinal direction labels (N, S, E, W) positioned at edges
  - Center dot (purple, 16pt diameter)
- Heading display card:
  - Purple background card below compass
  - Large degree value (e.g., "127°")
  - Cardinal direction text (e.g., "Southeast")
- Calibration hint: Small text at bottom suggesting device movement if accuracy is poor
- Unavailable state: Gray compass icon with message if magnetometer not available

### 4. Settings Screen
**Purpose:** App preferences and user customization.

**Layout:**
- Header: Default navigation header with title "Settings", transparent background
- Main content: ScrollView form
- Safe area insets:
  - Top: headerHeight + Spacing.xl
  - Bottom: tabBarHeight + Spacing.xl

**Components:**
- Profile section:
  - Circular avatar (80pt diameter, centered)
  - Tap to change avatar (show 1 preset option)
  - Display name text input field
- Preferences section (grouped list):
  - Units toggle (Metric/Imperial)
  - Update frequency picker (Real-time, 1s, 2s)
  - Theme toggle (Light/Dark)
  - Haptic feedback switch
- Each setting row: Label on left, control on right
- Section headers: Small caps, gray text

## Design System

### Color Palette
**Primary Colors:**
- Primary Blue: #2563EB (buttons, GPS accent)
- Primary Green: #059669 (IMU accent)
- Primary Purple: #7C3AED (Compass accent)

**Backgrounds:**
- App Background: Linear gradient from #EFF6FF (blue-50) to #E0E7FF (indigo-100)
- Card Background: #FFFFFF with subtle shadow
- Light Blue Tint: #DBEAFE (GPS cards)
- Light Green Tint: #D1FAE5 (IMU cards)
- Light Purple Tint: #EDE9FE (Compass cards)

**Text:**
- Primary Text: #1F2937 (gray-800)
- Secondary Text: #6B7280 (gray-500)
- Label Text: #9CA3AF (gray-400)

**System:**
- Error: #EF4444
- Error Background: #FEE2E2
- Success: #10B981

### Typography
- **Large Title:** 34pt, Bold (screen titles in header)
- **Title:** 28pt, Bold (sensor section headers)
- **Headline:** 20pt, Semibold (card labels)
- **Large Value:** 48pt, Bold (compass degree display)
- **Value:** 24pt, Bold (sensor readings)
- **Body:** 17pt, Regular (descriptions, settings)
- **Caption:** 13pt, Regular (units, hints)

### Component Styling
**Buttons:**
- Primary Button: Blue background (#2563EB), white text, 12pt corner radius, 44pt min height
- Pressed state: Darken background to #1D4ED8, no shadow

**Cards:**
- White background, 16pt corner radius
- Subtle shadow: shadowOffset {width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 3
- 16pt internal padding
- 16pt margin between cards

**Data Grid:**
- 12pt gap between columns
- 16pt gap between rows
- Cards flex equally to fill width

**Compass Visual:**
- Border ring: 8pt stroke width, light purple (#EDE9FE)
- Needle: Red (#EF4444), 4pt width, 80pt length, rounded caps
- Center dot: Purple (#7C3AED), 16pt diameter
- Cardinal labels: 14pt, semibold, positioned 12pt from edge

**Forms:**
- Input fields: 16pt padding, 8pt corner radius, light gray border
- Toggles/switches: System default with blue tint color
- Picker: Subtle border, 8pt corner radius

### Interaction Design
- **Sensor Updates:** Animate value changes with spring animation (duration: 300ms)
- **Compass Needle:** Smooth rotation with spring animation (stiffness: 100, damping: 10)
- **Button Feedback:** Scale down to 0.96 when pressed, haptic feedback on tap
- **Permission Prompts:** Show native system permission dialogs, display helpful message in-app if denied
- **Loading States:** Show shimmer effect on data cards when fetching initial sensor data
- **Error Handling:** Display error banners with retry actions where applicable

### Accessibility
- All interactive elements minimum 44pt touch target
- VoiceOver labels for all sensor readings (e.g., "Latitude: 45.5 degrees north")
- Dynamic text size support for all text elements
- High contrast mode support with darker accent colors
- Reduce motion setting respects system preferences (disable needle animation)
- Color is never the only indicator (use icons and labels)

### Assets Required
**Generated Assets:**
1. **User Avatar Preset:** Abstract geometric compass icon (circular, 3-color gradient: blue→purple→green, minimal design, 200x200pt)

**System Icons (from @expo/vector-icons - Feather set):**
- MapPin (Location tab)
- Activity (Motion tab)
- Compass (Compass tab)
- Settings (Settings tab)
- AlertCircle (Error states)
- RefreshCw (Update/retry actions)

No custom images or illustrations required beyond the single avatar asset.