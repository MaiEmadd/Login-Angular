import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DateAdapter } from '@angular/material/core';
import { LicensesApiService } from '../licenses-api.service';
import {ActivatedRoute} from "@angular/router";
import { Branch } from '../Branch';
import { BranchConstants } from '../branch-constants';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-show-license',
  templateUrl: './show-license.component.html',
  styleUrls: ['./show-license.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initialArrow', style({
      })),
      state('invertedArrow', style({
        transform: "rotate(180deg)"
      })),
      state('initial', style({
        height:'0',
        overflow:'hidden',
        opacity:'0',
        padding: '0',
      })),
      state('final', style({
        overflow:'hidden',
        opacity:'1'
      })),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms')),
      transition('initialArrow=>invertedArrow', animate('300ms')),
      transition('invertedArrow=>initialArrow', animate('300ms'))
    ]),
  ]
})
export class ShowLicenseComponent implements OnInit {

  currentBranch :Branch;

  constants = BranchConstants;

  download_url = "";
  store_codes?: any[];
  errorStoreCodeFlag = false;
  previous_store_code?: Number;
  has_previous_attachments?: Boolean;

  valid_through:string | null = "";
  end_date:string | null = "";

  public brach!:Branch;


  isCollapsed = {
    contractInfo: false,
    branchInfo: false,
    dates: false,
    attachments: false
  }

  editState = false

  className = "";
  // private _formBuilder: any;

  
  colapse(type: any) {
    this.isCollapsed[type as keyof typeof this.isCollapsed] = !this.isCollapsed[type as keyof typeof this.isCollapsed];
  }

  edit():void {
    this.editState = true;
    this._LicensesApiService.listStoreCodes().subscribe((data) => {
      this.store_codes = data;
    })
  }

  cancel(): void {
    this.editState = false;
  }

  save(files: any[]): void {

    this.currentBranch.valid_through = this.datePipe.transform(<Date> <unknown>this.currentBranch.valid_through, "yyyy/MM/dd");
    this.currentBranch.renewal_date =  this.datePipe.transform(<Date> <unknown>this.currentBranch.renewal_date, "yyyy/MM/dd");

    this._LicensesApiService.updateLicense(this.currentBranch, this.routerParams.snapshot.params?.['id']).subscribe( data => {
      this.currentBranch = data;
      this.currentBranch.has_attachment = this.has_previous_attachments;
      this.toastr.success('تم الحفظ بنجاح', '', {
        timeOut: 2000,
        tapToDismiss: true,
        extendedTimeOut: 2000,
        progressBar: true
      }) ;
    }, error => {console.log(error.status)
      this.toastr.error('خطأ! يرجى التأكد من اتصالك بالإنترنت', '', {
        timeOut: 2000,
        tapToDismiss: true,
        extendedTimeOut: 2000,
        progressBar: true
      }) ;
    })
    this.editState = false;

    if(files.length != 0)
    if (!this.currentBranch.has_attachment)
      this._LicensesApiService.addLicenseAttachments(files, <string> this.routerParams.snapshot.params?.['id'] ).subscribe(data => {
        this.currentBranch.has_attachment = true;
        this.toastr.success('تم الحفظ بنجاح', '', {
          timeOut: 2000,
          tapToDismiss: true,
          extendedTimeOut: 2000,
          progressBar: true
        }) ;
      })
    else
    this._LicensesApiService.addLicenseAttachments(files, <string> this.routerParams.snapshot.params?.['id']).subscribe(data => {
      this.currentBranch.has_attachment = true;
      this.toastr.success('تم الحفظ بنجاح', '', {
        timeOut: 2000,
        tapToDismiss: true,
        extendedTimeOut: 2000,
        progressBar: true
      }) ;
    })
  }

  constructor(private _formBuilder: FormBuilder,private dateAdapter: DateAdapter<any>, private toastr: ToastrService, private _LicensesApiService: LicensesApiService, private routerParams: ActivatedRoute, private _routerLink: Router,
    private datePipe: DatePipe) {
    this.currentBranch = {}
    const id = this.routerParams.snapshot.params?.['id'];
    this._LicensesApiService.getLicenseById(id).subscribe((data)=> {
      this.currentBranch = data;
      this.has_previous_attachments = this.currentBranch.has_attachment;
        this.download_url = `http://adminkazyonplus.uksouth.cloudapp.azure.com/api/license/attachment/download/${this.routerParams.snapshot.params?.['id']}`
    },
      (error) => {
        this._routerLink.navigate(['**'])
      }
    )
   }

   checkCode() {
    if (this.store_codes?.indexOf((<Number> (<unknown>this.currentBranch.store_code))) != -1 && this.currentBranch.store_code != this.previous_store_code)
        this.errorStoreCodeFlag = true;
    else
      this.errorStoreCodeFlag = false;
  }

  firstFormGroup = this._formBuilder.group({
    store_code: ['', Validators.required],
    sap_code: [''],
    governorate: [''],
    province: [''],
    branch_address: [''],
    status: [this.constants.states[0].name, Validators.required],
    valid_through: [''],
    renewal_through: ['']
  });

  secondFormGroup = this._formBuilder.group({
    branch_confirmations: [''],
    branch_address: ['', Validators.required],
    governorate: ['', Validators.required],
    province: ['', Validators.required]
  });

  thirdFormGroup = this._formBuilder.group({
    renewal_date: '',
    valid_through: ['', Validators.required],
  });

  ngOnInit(): void {
    this.dateAdapter.setLocale('ar');
  }
}
