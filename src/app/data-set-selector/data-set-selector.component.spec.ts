import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';

import { DataSetSelectorComponent } from './data-set-selector.component';
import { MnemonicsService } from './data-access/mnemonics.service';
import { AccordionGroupCustomEvent } from '@ionic/core/dist/types/components/accordion-group/accordion-group-interface';

describe('DataSetSelectorComponent', () => {
  let component: DataSetSelectorComponent;
  let fixture: ComponentFixture<DataSetSelectorComponent>;

  beforeEach(waitForAsync(() => {
    const mnemonicsSpy = jasmine.createSpyObj(MnemonicsService, [
      'getMnemonics',
    ]);
    TestBed.configureTestingModule({
      declarations: [DataSetSelectorComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: MnemonicsService, useValue: mnemonicsSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(DataSetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('sendSeriesRequest', () => {
    beforeEach(() => {
      spyOn(component.seriesRequest, 'emit');
    });
    it('should emit the series request string', (done) => {
      component.sendSeriesRequest('testString');
      fixture.detectChanges();
      expect(component.seriesRequest.emit).toHaveBeenCalledWith('testString');
      done();
    });
    it('should set the accordion value to an empty string', (done) => {
      component.accordionGroup = {
        value: 'testString',
      } as IonAccordionGroup;
      component.sendSeriesRequest('testString');
      fixture.detectChanges();
      expect(component.accordionGroup.value).toEqual('');
      done();
    });
  });
  describe('getAccordionData', () => {
    it('should set the selectedAccordion property to the ion accordion event value', (done) => {
      const accordionEvent = {
        detail: {
          value: 'testString',
        },
      } as AccordionGroupCustomEvent;
      component.getAccordionData(accordionEvent);
      expect(component.selectedAccordion).toEqual('testString');
      done();
    });
  });
});
