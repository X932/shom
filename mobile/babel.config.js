module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@pages': './src/pages',
          '@styles': './src/shared/styles',
          '@services': './src/shared/services',
          '@utils': './src/shared/utils',
          '@interfaces': './src/shared/interfaces',
          '@components': './src/shared/components',
          '@axios-instance': './src/shared/axios-instance',
          '@ui-layouts': './src/shared/ui-layouts',
          '@hooks': './src/shared/hooks',
          '@app-store': './src/store',
          '@slices': './src/store/slices',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
