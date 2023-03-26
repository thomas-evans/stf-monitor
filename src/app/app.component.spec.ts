import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MenuController } from '@ionic/angular';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const menuSpy = jasmine.createSpyObj('MenuController', ['open']);
  const openSpy = menuSpy.open.and.callFake(() => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [],
      providers: [{ provide: MenuController, useValue: menuSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    expect(component).toBeTruthy();
  });
  describe('openMenu', () => {
    it('should call the menuController open method', (done) => {
      component.openMenu();
      fixture.detectChanges();
      expect(openSpy).toHaveBeenCalled();
      done();
    });
  });
});
