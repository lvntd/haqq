const { FusesPlugin } = require('@electron-forge/plugin-fuses')
const { FuseV1Options, FuseVersion } = require('@electron/fuses')

module.exports = {
  packagerConfig: {
    asar: true,
    // Add app metadata
    name: 'Haqq',
    executableName: 'haqq',
    // icon: './assets/icon.ico', // Uncomment when you have an icon
    // App version and details
    appVersion: '1.0.0',
    buildVersion: '1.0.0',
    // Windows-specific metadata
    win32metadata: {
      CompanyName: 'Your Company Name',
      FileDescription: 'Haqq Application',
      OriginalFilename: 'haqq.exe',
      ProductName: 'Haqq',
      InternalName: 'haqq',
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // Windows installer configuration
        name: 'haqq',
        authors: 'levan.tediashvili@outlook.com',
        description: 'Haqq Application',
        // setupIcon: './assets/icon.ico', // Uncomment when you have an icon
        // loadingGif: './assets/loading.gif', // Optional loading animation
        setupExe: 'Haqq-Setup.exe',
        setupMsi: 'Haqq-Setup.msi',
        // Skip delta packages for faster builds (optional)
        noDelta: true,
        // Installer options
        noMsi: false, // Set to true if you don't want MSI
        remoteReleases: false,
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32'], // Added win32 for Windows ZIP files
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
}
