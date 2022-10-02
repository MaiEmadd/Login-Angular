import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


export interface UsersData {
  username: string;
  email: string;
  dep: string;
  permissions:string;
}


@Component({
  selector: 'app-userdatadialog',
  templateUrl: './userdatadialog.component.html',
  styleUrls: ['./userdatadialog.component.css']
})

export class UserdatadialogComponent {
  addressForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, Validators.required,Validators.email],
    dep: [null, Validators.required],
    permissions: [null, Validators.required],
  });

  @ViewChild(MatTableDataSource) table?: MatTableDataSource<any>;


  permissions = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
  ];

  action:string;
  local_data:any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserdatadialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsersData){
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
