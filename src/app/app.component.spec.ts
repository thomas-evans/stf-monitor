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
  describe('sendSeriesRequest', () => {
    it('should take a string and set the series property to it', (done) => {
      expect(component.series).toEqual('');
      component.sendSeriesRequest('testString');
      expect(component.series).toEqual('testString');
      done();
    });
    it('should set the seriesLoaded property to true', (done) => {
      expect(component.seriesLoaded).toBeFalse();
      component.sendSeriesRequest('testString');
      expect(component.seriesLoaded).toBeTrue();
      done();
    });
  });
});
