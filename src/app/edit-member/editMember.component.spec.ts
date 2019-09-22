import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MemberDetailsComponent } from '../member-details/member-details.component';

import { Router, ActivatedRoute } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { EditMemberComponent } from './editMember.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from '../app.service';

describe('EditMemberComponent', () => {
    let routerStub;
    let component: EditMemberComponent;
    let fixture: ComponentFixture<EditMemberComponent>;

    beforeEach(async(() => {
        routerStub = {
            navigate: jasmine.createSpy('navigate')
        }
        TestBed.configureTestingModule({
            declarations: [EditMemberComponent, MemberDetailsComponent],
            imports: [HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
            providers: [
                {
                    provide: Router,
                    useValue: routerStub
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 1 })
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditMemberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load member from route param', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const req = httpMock.expectOne({ method: 'GET', url: 'http://localhost:8000/api/members/1' });
        expect(req.request.method).toEqual('GET');
        var data = getFakeMember();
        req.flush(data);
        expect(component.member.id).toBe(1);
    }));
    
    it('should redirect on successful update',  inject([HttpTestingController], (httpMock: HttpTestingController) => {
        component.updateMember(getFakeMember());        

        const req = httpMock.expectOne({ method: 'PUT', url: 'http://localhost:8000/api/members' });
        expect(req.request.method).toEqual('PUT');
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