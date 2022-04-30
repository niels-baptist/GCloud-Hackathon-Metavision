import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  showNav: boolean = false;

  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  toggleNav(): void {
    this.showNav = !this.showNav;
  }
  async logout() {
    this.auth.signOut();
    window.location.href = '/';
  }
}
