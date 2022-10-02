import {SelectionModel} from '@angular/cdk/collections';
import {Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { ReassignPassComponent } from '../reassign-pass/reassign-pass.component';
import { UserdatadialogComponent } from '../userdatadialog/userdatadialog.component';

export interface user {
  name: string;
  id: number;
  email: string;
  permissions: string;
  department:string;
  password:string;
  details:string;
}

const ELEMENT_DATA: user[] = [
  {id: 1, name: 'محمد عادل', email:'madel122@yahoo.com' , permissions: 'H',department:'التسويق', password:'',details:''},
  {id: 2, name: 'احمد محمد', email:'a.mohamed17@hotmail.com' , permissions: 'He',department:'خدمة العملاء', password:'',details:''},
  {id: 3, name: 'حسام احمد', email:'hahmed22@yahoo.com' , permissions: 'Li',department:'الحسابات', password:'',details:''},
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})

export class UsermanagementComponent {
  displayedColumns: string[] = ['select', '#', 'name', 'email', 'permissions', 'department','password','details'];
  dataSource = new MatTableDataSource<user>(ELEMENT_DATA);
  selection = new SelectionModel<user>(true, []);

  
  @ViewChild(MatTable) table?: MatTable<any>;

  constructor(public dialog: MatDialog){}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: user): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  openDialog(action:any,obj:any): void 
  {
    obj.action = action;
    const dialogRef= this.dialog.open(UserdatadialogComponent,{
      width:'500px',
      data:obj
    });
  
    dialogRef.afterClosed().subscribe(result => {        
      if(result.event == 'اضافه'){
        this.addRowData(result.data);
      }
      else if(result.event == 'تعديل'){
        this.updateRowData(result.data);
      }
    });
  }

  openReassignDialog(action:any,obj:any): void 
  {
    obj.action = action;
    const dialogRef= this.dialog.open(ReassignPassComponent,{
      width:'500px',
      data:obj
    });

      dialogRef.afterClosed().subscribe(result => {        
        if(result.event == 'تعيين'){
          this.reassign(result.data);
        }
      });
  }
  


  addRowData(row_obj:any){
    this.dataSource.data.push({
      id: row_obj.id,
      name: row_obj.name,
      email: row_obj.email,
      permissions: row_obj.permissions,
      department: row_obj.department,
      password: row_obj.password,
      details: ''
    });
    this.table?.renderRows();
  }

  updateRowData(row_obj:any){
    this.dataSource.data = this.dataSource.data.filter((value:any,key:any)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.email = row_obj.email;
        value.permissions = row_obj.permissions;
        value.department = row_obj.department;
        value.password = row_obj.password;
      }
      return true;
    });
  }

  reassign(row_obj:any){
    this.dataSource.data = this.dataSource.data.filter((value:any,key:any)=>{
      if(value.id == row_obj.id){
        value.password = row_obj.password;
      }
      return true;
    });
  }
}




    



  
 