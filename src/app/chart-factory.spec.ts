import { chartFactory } from './chart-factory';
import { Chart } from 'chart.js';

describe('chartFactory', () => {
  it('should register the zoom plugin if the window object exists', async () => {
    await chartFactory()();
    expect(Chart.registry.plugins.get('zoom')).toBeDefined();
  });
});
