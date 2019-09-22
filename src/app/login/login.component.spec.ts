import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

let routerStub;
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
      providers: [
        {
          provide: Router,
          useValue: routerStub
        },
        HttpClient
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.loginForm instanceof FormGroup).toBe(true);
  });
  it('should redirect to members with valid login and password', () => {
    component.ngOnInit();
    component.loginForm.controls['username'].setValue('test');
    component.loginForm.controls['password'].setValue('test');
    component.login();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/members']);
  });
});
