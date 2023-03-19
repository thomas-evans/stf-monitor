import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataSetSelectorComponent } from './data-set-selector.component';
import { MnemonicsService } from './data-access/mnemonics.service';

describe('DataSetSelectorComponent', () => {
  let component: DataSetSelectorComponent;
  let fixture: ComponentFixture<DataSetSelectorComponent>;
  let mnemonicsService: jasmine.SpyObj<MnemonicsService>;
  beforeEach(waitForAsync(() => {
    const mnemonicsSpy = jasmine.createSpyObj(MnemonicsService, [
      'getMnemonics',
    ]);
    TestBed.configureTestingModule({
      declarations: [DataSetSelectorComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: MnemonicsService, useValue: mnemonicsSpy }],
    }).compileComponents();
    mnemonicsService = TestBed.inject(
      MnemonicsService
    ) as jasmine.SpyObj<MnemonicsService>;
    fixture = TestBed.createComponent(DataSetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
