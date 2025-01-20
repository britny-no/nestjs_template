module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: {
        circular: true,
        pathNot: ['^node_modules/'],
      },
    },
  ],
  options: {
    exclude: '^node_modules/', // node_modules 제외
  },
};
