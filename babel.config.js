module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@features': './src/features',
          '@lib': './src/lib',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@screens': './src/screens',
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
