import { seriesData } from '../app/series-display/data-access/interfaces/full-series';

export const seriesDataPercent: seriesData = {
  timeseries: {
    aggregation: [['2018-04-02', 1.77]],
  },
  metadata: {
    mnemonic: 'FNYR-BGCR-A',
    description: {
      vintage_approach: 'Vintage Approach',
      vintage: '',
      notes: 'notes',
      name: 'Broad General Collateral Rate',
      subsetting: 'None',
      subtype: 'Interest Rate',
      description: 'description',
    },
    schedule: {
      observation_period: 'Single Day',
      seasonal_adjustment: 'None',
      observation_frequency: 'Daily',
      start_date: '2018-04-02',
      last_update: '2023-03-28 12:30:01',
    },
    rights: {
      description: 'description',
    },
    parents: [],
    release: {
      long_name: 'Federal Reserve Bank of New York Reference Rates',
      href: '/short-term-funding-monitor/datasets/fnyr/',
      frequency: 'Daily',
      short_name: 'Reference Rates',
    },
    children: [],
    unit: {
      display_magnitude: 0,
      magnitude: 0,
      type: 'Rate',
      name: 'Percent',
      precision: 2,
    },
  },
};

export const seriesDataUSD: seriesData = {
  timeseries: {
    aggregation: [['2010-11-30', 434141816591.42]],
  },
  metadata: {
    mnemonic: 'MMF-MMF_AG_TOT-M',
    description: {
      vintage_approach: 'Monthly Revisions - Complete Series',
      vintage: 'Monthly Revisions - Complete Series',
      notes: '',
      name: 'Money Market Mutual Fund Investments in Federal Agency and GSE Securities',
      subsetting: 'Assets',
      subtype: 'Outstanding Volume',
      description:
        'Money market fund investments in Federal Agency and GSE securities',
    },
    schedule: {
      observation_period: 'Single Day',
      seasonal_adjustment: 'None',
      observation_frequency: 'Monthly',
      start_date: '2010-11-30',
      last_update: '2023-03-14 20:21:00',
    },
    rights: {
      description: '',
    },
    parents: ['MMF-MMF_TOT-M'],
    release: {
      long_name: 'OFR U.S. Money Market Fund Data Release',
      href: '/short-term-funding-monitor/datasets/mmf/',
      frequency: 'Monthly',
      short_name: 'U.S. Money Market Funds',
    },
    children: [],
    unit: {
      display_magnitude: 0,
      magnitude: 0,
      type: 'Volume',
      name: 'USD',
      precision: 2,
    },
  },
};

export const seriesDataUnknownUnit: seriesData = {
  timeseries: {
    aggregation: [['2010-11-30', 434141816591.42]],
  },
  metadata: {
    mnemonic: 'MMF-MMF_AG_TOT-M',
    description: {
      vintage_approach: 'Monthly Revisions - Complete Series',
      vintage: 'Monthly Revisions - Complete Series',
      notes: '',
      name: 'Money Market Mutual Fund Investments in Federal Agency and GSE Securities',
      subsetting: 'Assets',
      subtype: 'Outstanding Volume',
      description:
        'Money market fund investments in Federal Agency and GSE securities',
    },
    schedule: {
      observation_period: 'Single Day',
      seasonal_adjustment: 'None',
      observation_frequency: 'Monthly',
      start_date: '2010-11-30',
      last_update: '2023-03-14 20:21:00',
    },
    rights: {
      description: '',
    },
    parents: ['MMF-MMF_TOT-M'],
    release: {
      long_name: 'OFR U.S. Money Market Fund Data Release',
      href: '/short-term-funding-monitor/datasets/mmf/',
      frequency: 'Monthly',
      short_name: 'U.S. Money Market Funds',
    },
    children: [],
    unit: {
      display_magnitude: 0,
      magnitude: 0,
      type: 'Volume',
      name: 'TestUnit',
      precision: 2,
    },
  },
};
