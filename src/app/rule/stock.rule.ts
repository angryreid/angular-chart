export const StockRule = {
  market: {
    us: {
      timeUtcOffset: -4,
      marketDurtion: 385,
      positiveColor: '#0f7d42',// GREEN
      negativeColor: '#ab1912',// RED
      positiveGradientColor: 'rgba(115, 125, 66, 0.1)',
      negativeGradientColor: 'rgba(171, 25, 18, 0.1)'
    },
    hk: {
      timeUtcOffset: 8,
      marketDurtion: 385,
      positiveColor: '#ab1912',
      negativeColor: '#0f7d42',
      positiveGradientColor: 'rgba(171, 25, 18, 0.1)',
      negativeGradientColor: 'rgba(115, 125, 66, 0.1)'
    }
  }
}