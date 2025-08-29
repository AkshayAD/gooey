# Clode - Quick Start Guide

## Prerequisites

1. **Bun** - Fast JavaScript runtime & package manager
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Rust** - Required for Tauri backend
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **Platform-specific dependencies**:
   - **Windows**: WebView2 (comes with Windows 11 or Edge)
   - **macOS**: Xcode Command Line Tools
   - **Linux**: `webkit2gtk-4.1`, `libgtk-3-dev`, `libayatana-appindicator3-dev`

## Installation & Running

### Development Mode (Recommended for first run)
```bash
# Clone the repository
git clone <your-repo-url>
cd clode

# Install dependencies
bun install

# Run in development mode
bun run tauri dev
```

### Production Build

#### Windows
```bash
# Build for Windows (creates MSI and NSIS installers)
bun run tauri build

# Installers will be in:
# src-tauri/target/release/bundle/msi/Clode_1.0.0_x64.msi
# src-tauri/target/release/bundle/nsis/Clode_1.0.0_x64-setup.exe
```

#### macOS
```bash
# Build for macOS
bun run tauri build

# App will be in:
# src-tauri/target/release/bundle/dmg/Clode_1.0.0.dmg
```

#### Linux
```bash
# Build for Linux
bun run tauri build

# Packages will be in:
# src-tauri/target/release/bundle/deb/clode_1.0.0_amd64.deb
# src-tauri/target/release/bundle/appimage/clode_1.0.0_amd64.AppImage
```

## First Launch

1. **Claude Code Installation**: 
   - The app will show a status indicator (green/yellow/red)
   - If Claude Code is not found, click "Configure" to set it up
   - Install Claude Code via: `npm install -g @claude`

2. **Authentication**:
   - If the indicator shows "Auth Required" (yellow)
   - Open a terminal and run: `claude auth login`
   - Follow the authentication flow
   - The app will automatically detect when authenticated

3. **Status Indicators**:
   - 🟢 **Green (Ready)**: Claude is installed and authenticated
   - 🟡 **Yellow (Auth Required)**: Claude is installed but needs authentication
   - 🔴 **Red (Not Found)**: Claude Code is not installed

## Troubleshooting

### Build Errors
- **Missing dependencies**: Install platform-specific dependencies listed above
- **Rust compilation errors**: Update Rust: `rustup update`
- **Node/Bun errors**: Clear cache: `bun pm cache rm --all`

### Runtime Issues
- **Claude not detected**: Manually configure path in Settings
- **Authentication fails**: Run `claude auth login` in terminal
- **Windows path issues**: Ensure Claude is in PATH or installed via npm globally

### Windows-Specific
- The app checks these locations for Claude:
  - `%APPDATA%\npm\claude.cmd`
  - `%PROGRAMFILES%\nodejs\claude.exe`
  - `%USERPROFILE%\.claude\local\claude.exe`
  - Any location in PATH

## Features

- ✅ **No Tracking**: All telemetry and analytics removed
- ✅ **Windows Optimized**: Full Windows path support
- ✅ **Visual Status**: Real-time Claude status indicator
- ✅ **Auto-detection**: Finds Claude in multiple locations
- ✅ **Seamless Auth**: Detects existing Claude credentials

## Support

For issues or questions, please open an issue on the GitHub repository.