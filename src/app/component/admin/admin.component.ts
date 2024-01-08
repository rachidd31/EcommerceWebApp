import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private fire: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  async fetchUsers(): Promise<void> {
    // try {
    //   await this.fire.listAllUsers(undefined);
    //   console.log("Fetching users completed.");
    // } catch (error) {
    //   console.error('Error fetching users:', error);
    // }


  }

  // deleteUser(uid: string): void {
  //   this.fire.deleteUser(uid).then(() => {
  //     // Update the users list after deletion
  //     this.fetchUsers();
  //   });
  // }
  //
  // disableUser(uid: string): void {
  //   this.fire.disableUser(uid).then(() => {
  //     // Update the users list after disabling
  //     this.fetchUsers();
  //   });
  // }
}
