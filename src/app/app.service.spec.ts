import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should set username', inject([AppService], (service: AppService) => {
    service.setUsername('test');

    expect(service.getUsername()).toBe('test');
  }));

  it('should get all members', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    
    service.getMembers().subscribe(data => {
      expect(data.members.length).toBe(3);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/members');
    expect(req.request.method).toEqual('GET');
    var data = getFakeMembers();
    req.flush({ members: data });
  }));

  
  it('should get one member', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    
    service.getMember(1).subscribe(data => {
      expect(data.id).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/members/1');
    expect(req.request.method).toEqual('GET');
    req.flush({
        "id": 1,
        "firstName": "Alex",
        "lastName": "Doe",
        "jobTitle": "Driver",
        "team": "Formula 1 - Car 77",
        "status": "Active"
      }
    );
  }));

  it('should update one member', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    var updatedMember = {
      "id": 1,
      "firstName": "Alex",
      "lastName": "Doe",
      "jobTitle": "Head Driver",
      "team": "Formula 1 - Car 77",
      "status": "Active"
    }

    service.updateMember(updatedMember).subscribe(data => {
      expect(data.id).toBe(1);
      expect(data.firstName).toBe('Alex');
    });

    const req = httpMock.expectOne('http://localhost:8000/api/members');
    expect(req.request.method).toEqual('PUT');
    req.flush({
        "id": 1,
        "firstName": "Alex",
        "lastName": "Doe",
        "jobTitle": "Driver",
        "team": "Formula 1 - Car 77",
        "status": "Active"
      }
    );
  }));

  it('should get all teams', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    
    service.getTeams().subscribe(data => {
      expect(data.teams.length).toBe(3);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/teams');
    expect(req.request.method).toEqual('GET');
    var data = getFakeTeams();
    req.flush({ teams: data });


  }));

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
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

function getFakeTeams(){
  return [{
    "id": 1,
    "teamName": "Formula 1 - Car 77"
  },
  {
    "id": 2,
    "teamName": "Formula 1 - Car 8"
  },
  {
    "id": 3,
    "teamName": "Formula 2 - Car 54"
  }];
}
