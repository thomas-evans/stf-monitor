import { Chart, registerables } from 'chart.js';

export function chartFactory() {
  return async () => {
    if (typeof window !== 'object') return;
    await import('chartjs-plugin-zoom').then((zoomPlugin) => {
      Chart.register(...registerables, zoomPlugin.default);
    });
  };
}
