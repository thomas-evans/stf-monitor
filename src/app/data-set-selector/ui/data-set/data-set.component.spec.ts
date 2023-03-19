import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, MenuController } from '@ionic/angular';

import { DataSetComponent } from './data-set.component';
import { DataSetService } from '../../data-access/data-set.service';

describe('DataSetComponent', () => {
  let component: DataSetComponent;
  let fixture: ComponentFixture<DataSetComponent>;
  let dataSetService: jasmine.SpyObj<DataSetService>;
  let menuController: jasmine.SpyObj<MenuController>;
  beforeEach(waitForAsync(() => {
    const dataSetSpy = jasmine.createSpyObj('DataSetService', ['getDataSets']);
    const menuSpy = jasmine.createSpyObj('MenuController', ['close']);
    TestBed.configureTestingModule({
      declarations: [DataSetComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DataSetService, useValue: dataSetSpy },
        { provide: MenuController, useValue: menuSpy },
      ],
    }).compileComponents();
    dataSetService = TestBed.inject(
      DataSetService
    ) as jasmine.SpyObj<DataSetService>;
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
  // it('put a value onto the mnemonic$ stream when @Input is triggered', (done) => {});
  // it('should close the menu whenever a series button is clicked', (done) => {});
  // it('should emit a series request whenever a series button is clicked', (done) => {});
});
