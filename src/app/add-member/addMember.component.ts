import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-member',
    templateUrl: './addMember.component.html',
    styleUrls: ['./addMember.component.css']
})
export class AddMemberComponent {
    constructor(public appService: AppService, private router: Router) { }
    
    addMember(member) {
        this.appService.addMember(member).subscribe(data => {
            this.router.navigate(['members']);
        });
    }

}
