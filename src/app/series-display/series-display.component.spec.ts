import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeriesDisplayComponent } from './series-display.component';
import { FullSeriesService } from './data-access/full-series.service';

describe('SeriesDisplayComponent', () => {
  let component: SeriesDisplayComponent;
  let fixture: ComponentFixture<SeriesDisplayComponent>;
  beforeEach(waitForAsync(() => {
    const fullSeriesSpy = jasmine.createSpyObj(FullSeriesService, [
      'getFullSeries',
    ]);
    TestBed.configureTestingModule({
      declarations: [SeriesDisplayComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: FullSeriesService, useValue: fullSeriesSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(SeriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('put a value onto the series$ stream when @Input is triggered', (done) => {
    spyOn(component.series$, 'next');
    component.series = 'test';
    fixture.detectChanges();
    expect(component.series$.next).toHaveBeenCalledWith('test');
    done();
  });
});
