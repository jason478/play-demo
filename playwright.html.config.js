const config = {
  reporter: [['html', {
    outputFolder: 'jasons-report',
    open: 'never',
    host: '0.0.0.0',
    port: 9223,
  }]],
};

module.exports = config;