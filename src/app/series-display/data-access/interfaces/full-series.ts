export interface FullSeries {
  series: seriesData;
}

export interface seriesData{
  timeseries: timeseries;
  metadata?: metadata;
}

interface timeseries{
  aggregation: [[string, number | null]]
  disclosure_edits: [[string, string | null]]
}
export interface metadata {
  mnemonic: string;
  description: description;
  rights: rights;
  schedule: schedule;
  parents: [string];
  release: release;
  children: [string];
  unit: unit;
}

interface description {
  vintage_approach: string;
  vintage: string;
  notes: string;
  description: string;
  subsetting: string,
  subtype: string;
  name: string;
}

interface rights {
  description: string;
}

interface schedule {
  observation_period: string;
  seasonal_adjustment: string
  observation_frequency: string;
  start_date: string;
  last_update: string;
}

interface release {
  long_name: string;
  href: string;
  frequency: string;
  short_name: string;
}

interface unit {
  type: string;
  magnitude: number;
  display_magnitude: number;
  name: string;
  precision: number;
}
