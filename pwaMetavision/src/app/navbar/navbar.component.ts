import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  showNav: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleNav(): void {
    this.showNav = !this.showNav;
  }
}
