import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

let routerStub;
describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  const appServiceSpy = jasmine.createSpyObj('AppService', ['getUsername', 'setUsername'])

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule,  ],
      providers: [
        {
          provide: AppService,
          useValue: appServiceSpy
        }, 
        {
          provide: Router,
          useValue: routerStub
        }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username', inject([AppService], (service: AppService) => {
    appServiceSpy.getUsername.and.returnValue('Test');
    appServiceSpy.setUsername.and.returnValue();
    fixture.detectChanges();
    var de = fixture.debugElement;
    var div = de.query(By.css('.welcome'));

    expect(div).not.toBe(null);

  }))

  it('should redirect to login page on logout', () => {
    component.logout();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/login']);
  })
});
