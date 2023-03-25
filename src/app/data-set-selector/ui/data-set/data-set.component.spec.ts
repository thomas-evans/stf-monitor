import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, MenuController } from '@ionic/angular';

import { DataSetComponent } from './data-set.component';
import { DataSetService } from '../../data-access/data-set.service';
import { of } from 'rxjs';

describe('DataSetComponent', () => {
  let component: DataSetComponent;
  let fixture: ComponentFixture<DataSetComponent>;
  const dataSetSpy = jasmine.createSpyObj('DataSetService', ['getDataSets']);
  const getDataSetsSpy = dataSetSpy.getDataSets.and.returnValue(
    of(['testString'])
  );
  let menuController: jasmine.SpyObj<MenuController>;
  const menuSpy = jasmine.createSpyObj('MenuController', ['close']);
  const closeSpy = menuSpy.close.and.callFake(() => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  });
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataSetComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DataSetService, useValue: dataSetSpy },
        { provide: MenuController, useValue: menuSpy },
      ],
    }).compileComponents();
    menuController = TestBed.inject(
      MenuController
    ) as jasmine.SpyObj<MenuController>;
    fixture = TestBed.createComponent(DataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('put a value onto the mnemonic$ stream when @Input is triggered', (done) => {
    spyOn(component.mnemonic$, 'next');
    component.mnemonic = 'test';
    fixture.detectChanges();
    expect(component.mnemonic$.next).toHaveBeenCalledWith('test');
    done();
  });
  describe('clicking the series button', () => {
    beforeEach(() => {
      spyOn(component.seriesRequest, 'emit');
      component.mnemonic = 'test';
      fixture.detectChanges();
      const ionButton = fixture.debugElement.nativeElement;
      ionButton.querySelector('ion-item').click();
      fixture.detectChanges();
    });
    it('should call the getDataSets whenever a series button is clicked', (done) => {
      expect(getDataSetsSpy).toHaveBeenCalled();
      done();
    });
    it('should close the menu whenever a series button is clicked', (done) => {
      expect(closeSpy).toHaveBeenCalled();
      done();
    });
    it('should emit a series request whenever a series button is clicked', (done) => {
      menuController.close().then(() => {
        expect(component.seriesRequest.emit).toHaveBeenCalled();
        done();
      });
    });
  });
});
