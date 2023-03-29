import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartBuilderComponent } from './chart-builder.component';
import { ChartBuilderService } from './utils/chart-builder.service';
import { APP_INITIALIZER } from '@angular/core';
import { chartFactory } from '../../../chart-factory';

describe('ChartBuilderComponent', () => {
  let component: ChartBuilderComponent;
  let fixture: ComponentFixture<ChartBuilderComponent>;
  const chartBuilderSpy = {
    chartBuilder: jasmine.createSpy('chartBuilder').and.returnValue({
      render: jasmine.createSpy('render').and.callThrough(),
    }),
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
  // describe('ngAfterViewInit', () => {
  //   it('should instantiate the chart with plugins if the window object exists', (done) => {
  //     component.ngAfterViewInit();
  //     expect(component.chart).toContain('123');
  //     done();
  //   });
  // });
});
