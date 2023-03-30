import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartBuilderComponent } from './chart-builder.component';
import { ChartBuilderService } from './utils/chart-builder.service';
import { APP_INITIALIZER } from '@angular/core';
import { chartFactory } from '../../../chart-factory';
import { seriesData } from '../../data-access/interfaces/full-series';

const seriesDataObj: seriesData = {
  timeseries: {
    aggregation: [['2018-04-02', 1.77]],
  },
  metadata: {
    mnemonic: 'FNYR-BGCR-A',
    description: {
      vintage_approach: 'Current vintage, as of last update',
      vintage: '',
      notes:
        "It is possible that revisions to the rates could occur after the data are retrieved by the OFR, or that other errors could be introduced, so parties seeking to use these data in contracts should retrieve them directly from the Federal Reserve Bank of New York. Users of these rates are subject to the New York Fed’s <a href='https://www.newyorkfed.org/markets/reference-rates-terms-of-use'>terms of use.</a>",
      name: 'Broad General Collateral Rate',
      subsetting: 'None',
      subtype: 'Interest Rate',
      description:
        'The volume-weighted median, which is the rate associated with transactions at the 50th percentile of transaction volume. Volume is calculated as the sum of overnight transaction volume used to calculate each reference rate, rounded to the nearest $1 billion.',
    },
    schedule: {
      observation_period: 'Single Day',
      seasonal_adjustment: 'None',
      observation_frequency: 'Daily',
      start_date: '2018-04-02',
      last_update: '2023-03-28 12:30:01',
    },
    rights: {
      description:
        'Use of this data is subject to the terms included on the Federal Reserve Bank of New York’s website: https://www.newyorkfed.org/markets/reference-rates-terms-of-use',
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
describe('ChartBuilderComponent', () => {
  let component: ChartBuilderComponent;
  let fixture: ComponentFixture<ChartBuilderComponent>;
  const renderSpy = jasmine.createSpy('render').and.callThrough();
  const updateSpy = jasmine.createSpy('update').and.callThrough();
  const resetZoomSpy = jasmine.createSpy('resetZoom').and.callThrough();
  const chartBuilderSpy = {
    chartBuilder: jasmine.createSpy('chartBuilder').and.returnValue({
      render: renderSpy,
      update: updateSpy,
      resetZoom: resetZoomSpy,
    }),
    xScaleCallback: jasmine.createSpy('xScaleCallback').and.callThrough(),
    yScaleCallback: jasmine.createSpy('yScaleCallback').and.callThrough(),
    labelCallback: jasmine.createSpy('labelCallback').and.callThrough(),
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBuilderComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ChartBuilderService, useValue: chartBuilderSpy },
        { provide: APP_INITIALIZER, useFactory: chartFactory, multi: true },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ChartBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngAfterViewInit', () => {
    it('should create the chart instance', (done) => {
      component.ngAfterViewInit();
      expect(chartBuilderSpy.chartBuilder).toHaveBeenCalled();
      expect(component.chart).toBeInstanceOf(Object);
      done();
    });
    it('should call the render method on the chart instance', (done) => {
      component.ngAfterViewInit();
      expect(renderSpy).toHaveBeenCalled();
      done();
    });
  });
  describe('@input fullSeries', () => {
    it('should call next on the fullSeries$ ReplaySubject', (done) => {
      spyOn(component.fullSeries$, 'next');
      component.fullSeries = seriesDataObj;
      expect(component.fullSeries$.next).toHaveBeenCalledWith(seriesDataObj);
      done();
    });
    it('should call the update method on the chart instance', (done) => {
      component.fullSeries = seriesDataObj;
      expect(updateSpy).toHaveBeenCalled();
      done();
    });
    it('should call the resetZoom method on the chart instance', (done) => {
      component.fullSeries = seriesDataObj;
      expect(resetZoomSpy).toHaveBeenCalled();
      done();
    });
  });
  describe('ngOnDestroy', () => {
    it('should call the unsubscribe method on the fullSeries$ ReplaySubject', (done) => {
      spyOn(component.fullSeries$, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.fullSeries$.unsubscribe).toHaveBeenCalled();
      done();
    });
  });
  describe('ngOnInit', () => {
    it('should call the subscribe method on the fullSeries$ ReplaySubject', (done) => {
      spyOn(component.fullSeries$, 'subscribe');
      component.ngOnInit();
      expect(component.fullSeries$.subscribe).toHaveBeenCalled();
      done();
    });
    it('should call the xScaleCallback method from the chartBuilder service', (done) => {
      component.ngOnInit();
      component.fullSeries$.next(seriesDataObj);
      expect(chartBuilderSpy.xScaleCallback).toHaveBeenCalled();
      done();
    });
    it('should call the yScaleCallback method from the chartBuilder service', (done) => {
      component.ngOnInit();
      component.fullSeries$.next(seriesDataObj);
      expect(chartBuilderSpy.yScaleCallback).toHaveBeenCalled();
      done();
    });
    it('should call the labelCallback method from the chartBuilder service', (done) => {
      component.ngOnInit();
      component.fullSeries$.next(seriesDataObj);
      expect(chartBuilderSpy.labelCallback).toHaveBeenCalled();
      done();
    });
  });
});
