module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './assets',
            components: './src/components',
            pages: './src/pages',
            services: './src/services',
            functions: './src/functions',
            atoms: './src/atoms',
          },
        },
      ],
    ],
  }
}
