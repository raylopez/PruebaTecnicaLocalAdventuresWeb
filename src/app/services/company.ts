import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { type Company as CompanyModel } from '../models/company';
import { environment } from '../../environments/environment.development';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class Company {

  private readonly http = inject(HttpClient);

  public getCompanies(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(`${environment.apiUrl}/api/company`);
  }

  public getCompanyById(id: number): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(`${environment.apiUrl}/api/company/${id}`);
  }

  public getCompanyByIdWithClients(id: number): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(`${environment.apiUrl}/api/company/${id}/clients`);
  }

  public getInvoicesClients(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiUrl}/api/company/${id}/clients/invoices`);
  }
}
