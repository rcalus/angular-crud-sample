import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

let routerStub;
describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      declarations: [MembersComponent, MemberDetailsComponent],
      imports: [HttpClientModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        AppService,
        {
          provide: Router,
          useValue: routerStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ('should redirect to add member',() => {
    component.goToAddMemberForm();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/members/add']);
  });

  it ('should redirect to edit member',() => {
    component.editMemberById(1);
    expect(routerStub.navigate).toHaveBeenCalledWith(['/members/edit/1']);
  });

  it ('should load members',inject([HttpTestingController], (httpMock: HttpTestingController) => {
    
    const req = httpMock.expectOne({method: 'GET', url: 'http://localhost:8000/api/members'});
    expect(req.request.method).toEqual('GET');
    var data = getFakeMembers();
    req.flush(data);

    expect(component.members.length).toBe(3);

  }));

  it ('should delete member', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const req = httpMock.expectOne({method: 'GET', url: 'http://localhost:8000/api/members'});
    expect(req.request.method).toEqual('GET');
    var data = getFakeMembers();
    req.flush(data);
    expect(component.members.length).toBe(3);

    component.deleteMemberById(1);
    const reqDel = httpMock.expectOne({method: 'DELETE', url: 'http://localhost:8000/api/members/1'});
    expect(reqDel.request.method).toEqual('DELETE');
    reqDel.flush({});

    expect(component.members.length).toBe(2);
  }));


});
function getFakeMembers() {
  return [{
    "id": 1,
    "firstName": "Alex",
    "lastName": "Doe",
    "jobTitle": "Driver",
    "team": "Formula 1 - Car 77",
    "status": "Active"
  },
  {
    "id": 2,
    "firstName": "Alex",
    "lastName": "Sainz",
    "jobTitle": "Driver",
    "team": "Formula 1 - Car 8",
    "status": "Active"
  },
  {
    "id": 3,
    "firstName": "Jeb",
    "lastName": "Jackson",
    "jobTitle": "Reserve Driver",
    "team": "Formula 1 - Car 77",
    "status": "Inactive"
  }];
}