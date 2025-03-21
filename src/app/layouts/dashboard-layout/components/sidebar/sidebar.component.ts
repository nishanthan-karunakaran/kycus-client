import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  accessLinks = [
    {
      name: 'Entity',
      link: '/entity',
      icon: 'landmark'
    },
    {
      name: 'Consent',
      link: '/consent',
      icon: 'file-text'
    },
    {
      name: 'Wallet',
      link: '/wallet',
      icon: 'wallet'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
