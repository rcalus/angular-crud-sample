import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Member } from '../models';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  @Input() existingMember: Member;
  @Output() onSave: EventEmitter<Member> = new EventEmitter();
  memberForm: FormGroup;
  submitted: boolean;
  memberModel: Member;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    this.memberForm = this.createFormGroup();
    this.appService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.existingMember.currentValue){
      this.memberForm.setValue(changes.existingMember.currentValue);
    }
  }

  get firstNameField() { return this.memberForm.get('firstName'); }
  get lastNameField() { return this.memberForm.get('lastName'); }
  get jobTitleField() { return this.memberForm.get('jobTitle'); }
  get teamField() { return this.memberForm.get('team'); }
  get statusField() { return this.memberForm.get('status'); }

  createFormGroup(){
    return this.fb.group({
      id: [],
      firstName: ['',Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      status: ['', Validators.required],
      team: ['', Validators.required],
    });
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    this.onSave.emit(this.memberModel);
  }

  fieldIsInvalid(field: FormControl) {
    return field.invalid && (field.dirty || field.touched)
  }

}
