import { OnInit } from '@angular/core';
import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsersData } from '../userdatadialog/userdatadialog.component';
@Component({
  selector: 'app-reassign-pass',
  templateUrl: './reassign-pass.component.html',
  styleUrls: ['./reassign-pass.component.css']
})
export class ReassignPassComponent implements OnInit {

  action:string;
  local_data:any;

  passForm = this.fb.group({
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReassignPassComponent>,
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

  ngOnInit(): void {
  }

}
