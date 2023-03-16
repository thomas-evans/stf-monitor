import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SeriesDisplayComponent} from './series-display.component';
import {FullSeriesService} from "./data-access/full-series.service";

xdescribe('SeriesDisplayComponent', () => {
  let component: SeriesDisplayComponent;
  let fixture: ComponentFixture<SeriesDisplayComponent>;
  let fullSeriesService: jasmine.SpyObj<FullSeriesService>;
  beforeEach(waitForAsync(() => {
    const fullSeriesSpy = jasmine.createSpyObj(FullSeriesService, ['getFullSeries']);
    TestBed.configureTestingModule({
      declarations: [SeriesDisplayComponent],
      imports: [IonicModule.forRoot()],
      providers: [{provide: FullSeriesService, useValue: fullSeriesSpy}]
    }).compileComponents();
    fullSeriesService = TestBed.inject(FullSeriesService) as jasmine.SpyObj<FullSeriesService>;
    fixture = TestBed.createComponent(SeriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
