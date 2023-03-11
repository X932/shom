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
          '@utils': './src/shared/utils',
          '@interfaces': './src/shared/interfaces',
          '@components': './src/shared/components',
          '@ui-layouts': './src/shared/ui-layouts',
          '@hooks': './src/shared/hooks',
          '@app-store': './src/store',
          '@slices': './src/store/slices',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
