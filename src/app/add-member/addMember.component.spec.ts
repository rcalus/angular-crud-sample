import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AddMemberComponent } from './addMember.component';
import { MemberDetailsComponent } from '../member-details/member-details.component';

import { Router, ActivatedRoute } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
describe('AddMembersComponent', () => {
  let routerStub;

  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      declarations: [AddMemberComponent, MemberDetailsComponent],
      imports: [HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: routerStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect on successful add', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    component.addMember(getFakeMember());

    const req = httpMock.expectOne({ method: 'POST', url: 'http://localhost:8000/api/members' });
    expect(req.request.method).toEqual('POST');
    var data = getFakeMember();
    req.flush(data);
    expect(routerStub.navigate).toHaveBeenCalledWith(['members']);
  }));

});
function getFakeMember() {
  return {
    "id": 1,
    "firstName": "Alex",
    "lastName": "Doe",
    "jobTitle": "Driver",
    "team": "Formula 1 - Car 77",
    "status": "Active"
  };
}