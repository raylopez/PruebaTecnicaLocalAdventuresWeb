import { Component, DOCUMENT, inject, input, OnInit, signal } from '@angular/core';
import { Company } from '../../services/company';
import { Company as CompanyModel } from '../../models/company';
import { Client } from '../../models/client';
import { RouterLink } from "@angular/router";
import { Invoice } from '../../services/invoice';

@Component({
  selector: 'app-clients',
  imports: [RouterLink],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {

  public readonly id = input<number>(0);
  private readonly companyService = inject(Company);
  private readonly invoiceService = inject(Invoice);
  public company = signal<CompanyModel | null>(null);
  public clients = signal<Client[]>([]);
  public document = inject(DOCUMENT);

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData() {
    this.companyService.getCompanyById(this.id())
      .subscribe(com => this.company.set(com) );

    this.companyService.getInvoicesClients(this.id())
      .subscribe(cl => this.clients.set(cl));
  }

  public downloadInvoice(invoiceId: number) {
    this.invoiceService.downloadInvoicePdf(invoiceId)
      .subscribe(res => {
        let blob: Blob = res.body as Blob;
        let a = document.createElement('a');
        a.download = 'invoice.pdf';
        a.href= window.URL.createObjectURL(blob);
        a.click();

      });
  }
}
