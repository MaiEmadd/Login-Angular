import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


export interface user {
  id: number;
  sap: string;
  code: string;
  address: string;
  governorate:string;
  region:string;
  status:string;
}

const ELEMENT_DATA: user[] = [
  {id: 1, sap: "#45654", code:'#45654' , address: 'عنوان 1',governorate:'محافظة 1', region:'اقليم 1',status:'صادر له RR'},
  {id: 2, sap: "#62185", code:'#62185' , address: 'عنوان 2',governorate:'محافظة 2', region:'اقليم 2',status:'صادر له رخصة'},
  {id: 3, sap: "#39943", code:'#39943' , address: 'عنوان 3',governorate:'محافظة 3', region:'اقليم 3',status:'لم يقدم'},
  {id: 4, sap: "#03249", code:'#83249' , address: 'عنوان 4',governorate:'محافظة 4', region:'اقليم 4',status:'معلق'},
  {id: 5, sap: "#55654", code:'#25654' , address: 'عنوان 5',governorate:'محافظة 5', region:'اقليم 5',status:'صادر له RR'},
  {id: 6, sap: "#62185", code:'#62185' , address: 'عنوان 6',governorate:'محافظة 6', region:'اقليم 6',status:'صادر له رخصة'},
  {id: 7, sap: "#79943", code:'#59943' , address: 'عنوان 7',governorate:'محافظة 7', region:'اقليم 7',status:'لم يقدم'},
  {id: 8, sap: "#83249", code:'#93249' , address: 'عنوان 8',governorate:'محافظة 8', region:'اقليم 8',status:'معلق'}
];


@Component({
  selector: 'app-license-index',
  templateUrl: './license-index.component.html',
  styleUrls: ['./license-index.component.css'],
  
})

export class LicenseIndexComponent implements OnInit {

  displayedColumns: string[] = ['#', 'sap', 'code', 'address', 'governorate','region','status'];
  dataSource = new MatTableDataSource<user>(ELEMENT_DATA);
  selection = new SelectionModel<user>(true, []);

  constructor(private _Router:Router){}
  findByCode(search:HTMLInputElement){
    this.applyFilter(search.value)
  }
  
  applyFilter(filterValue:string){
    filterValue= filterValue.trim();
    filterValue= filterValue.toLocaleLowerCase();
    this.dataSource.filter=filterValue;
  }

  display(id ?: number) {
    this._Router.navigate(["licenses/view",id])
   }

  ngOnInit(): void {
  }
}
