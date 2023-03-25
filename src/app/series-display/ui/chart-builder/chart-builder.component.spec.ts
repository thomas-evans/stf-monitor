import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartBuilderComponent } from './chart-builder.component';
import { ChartBuilderService } from './utils/chart-builder.service';

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
      providers: [{ provide: ChartBuilderService, useValue: chartBuilderSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(ChartBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
