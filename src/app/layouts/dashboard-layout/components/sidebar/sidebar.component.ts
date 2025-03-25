import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  accessLinks = [
    {
      name: 'Entity',
      link: '/entity',
      icon: 'landmark',
    },
    {
      name: 'Consent',
      link: '/consent',
      icon: 'file-text',
    },
    {
      name: 'Wallet',
      link: '/wallet',
      icon: 'wallet',
    },
  ];
}
