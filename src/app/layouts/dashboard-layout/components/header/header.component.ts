import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  iconsArr= [
    {
      name: 'Bell',
      color: 'white',
      size: '20'
    },
    {
      name: 'UserRound',
      color: 'white',
      size: '22'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  trackIcon(index: number, item: any): string {
    return item.name;
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  handleIconClick(icon: string) {
    console.log(icon);
  }
}
