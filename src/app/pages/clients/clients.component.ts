import { Component, OnInit } from '@angular/core';
import { ProductOnRus } from 'src/app/core';

@Component({
  selector: 'credex-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  readonly columns: string[] = ['innClient', 'name', 'product', 'bank'];

  public productOnRus = ProductOnRus;

  constructor() {}

  public clients: any[] = [
    {
      inn: '12345678912',
      name: "ООО 'Ромашка'",
      product: 1,
      client_company_banks: [
        {
          bank: {
            name: 'Зенит',
            ip_address: '192.168.1.1',
            manager: {},
          },
          is_сlient_attached: true,
        },
      ],
    },
    {
      inn: '21987654321',
      name: "ООО 'Простоквашино'",
      product: 0,
      client_company_banks: [
        {
          bank: {
            name: 'Зенит',
            ip_address: '192.168.1.1',
            manager: {},
          },
          is_сlient_attached: false,
        },
      ],
    },
  ];

  public ngOnInit(): void {}
}
