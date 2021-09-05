import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientCompany, ClientsCompanyService } from 'src/app/core';

@Component({
  selector: 'credex-dossier-client',
  templateUrl: './dossier-client.component.html',
  styleUrls: ['./dossier-client.component.scss'],
})
export class DossierClientComponent implements OnInit {
  public idCompanyClient: string = '';

  public companyName = '';

  constructor(
    private route: ActivatedRoute,
    private clientsCompanyService: ClientsCompanyService
  ) {}

  public ngOnInit(): void {
    this.idCompanyClient = this.route.snapshot.params.id;
    this.clientsCompanyService
      .getClientCompany(this.idCompanyClient)
      .subscribe(({ name }: ClientCompany) => {
        this.companyName = name;
      });
  }
}
