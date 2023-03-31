import { ChartConfiguration } from 'chart.js';

const chartConfig: ChartConfiguration = {
  type: 'line',
  data: {
    datasets: [
      {
        data: [1, 2, 3, 4],
      },
    ],
    labels: ['2018-04-02', '2018-05-31', '2021-01-28', '2021-11-04'],
  },
};

export { chartConfig };
