import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Member } from '../models';

@Component({
    selector: 'app-edit-member',
    templateUrl: './editMember.component.html',
    styleUrls: ['./editMember.component.css']
})
export class EditMemberComponent implements OnInit {
    member: Member;
    
    constructor(private activeRoute: ActivatedRoute, public appService: AppService, private router: Router) { }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.appService.getMember(params['id']).subscribe(member => {
                this.member = member
            });
        });
    }

    updateMember(member) {
        this.appService.updateMember(member).subscribe(data => {
            this.router.navigate(['members']);
        });
    }

}
