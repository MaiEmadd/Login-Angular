import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Branch } from './Branch';
import { BranchStatus } from './branch-status';
import { Observable, ObservedValueOf} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LicensesApiService {
  constructor(private _HttpClient:HttpClient) { }

  api = 'http://localhost:8080/licenses/'

  getAllLicenses(filter_string?:String):Observable<Branch[]> {
    return this._HttpClient.get<Branch[]>(this.api + "filter?" + filter_string);
  }

  getLicenseById(id: Number):Observable<Branch> {
    return this._HttpClient.get<Branch>(this.api + id);
  }

  getLicenseStatusCount():Observable<BranchStatus> {
    return this._HttpClient.get(this.api + "status");
  }

  addLicenseAttachments(files: any[], id?: string | null) {
    var fd = new FormData();

    files.forEach(file => {
      fd.append("files", file, file.name);
    })
    return this._HttpClient.post<Branch[]>(this.api + "attachment/append?" + "id="+  <Number>  <unknown>id, fd, {
      headers: {
        "mimeType" : "multipart/form-data"
      }
    });
  }

  addLicense(contract:Branch):Observable<Branch> {
    return this._HttpClient.post<Branch>(this.api, contract, {
      headers: {
        "Access-Control-Allow-Origin":"*",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });

  }

  listStoreCodes():Observable<number[]> {
    return this._HttpClient.get<number[]>(this.api + "store-codes");
  }

  updateLicense(contract:Branch, id?:String) {
    return this._HttpClient.post(this.api + id, contract);
  }
}
