import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    if (!this.appService.getUsername())
      this.router.navigate(['login']);
    this.loadMembers();
  }

  private loadMembers(){
    this.appService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

  goToAddMemberForm() {
    this.router.navigate(['/members/add']);
  }

  editMemberById(id: number) {
    this.router.navigate(['/members/edit/' + id])
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(data => {
      var indexToDelete = this.members.findIndex(function(member){
        return member.id == id;
      });
      this.members.splice(indexToDelete, 1);            
    });
    
  }
}
