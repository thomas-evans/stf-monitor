import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartBuilderComponent } from './chart-builder.component';
import { ChartBuilderService } from './utils/chart-builder.service';
import { APP_INITIALIZER } from '@angular/core';
import { chartFactory } from '../../../chart-factory';
import { seriesDataPercent } from '../../../../test-helpers/series-data';

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
      component.fullSeries = seriesDataPercent;
      expect(component.fullSeries$.next).toHaveBeenCalledWith(
        seriesDataPercent
      );
      done();
    });
    it('should call the update method on the chart instance', (done) => {
      component.fullSeries = seriesDataPercent;
      expect(updateSpy).toHaveBeenCalled();
      done();
    });
    it('should call the resetZoom method on the chart instance', (done) => {
      component.fullSeries = seriesDataPercent;
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
      component.fullSeries$.next(seriesDataPercent);
      expect(chartBuilderSpy.xScaleCallback).toHaveBeenCalled();
      done();
    });
    it('should call the yScaleCallback method from the chartBuilder service', (done) => {
      component.ngOnInit();
      component.fullSeries$.next(seriesDataPercent);
      expect(chartBuilderSpy.yScaleCallback).toHaveBeenCalled();
      done();
    });
    it('should call the labelCallback method from the chartBuilder service', (done) => {
      component.ngOnInit();
      component.fullSeries$.next(seriesDataPercent);
      expect(chartBuilderSpy.labelCallback).toHaveBeenCalled();
      done();
    });
  });
});
