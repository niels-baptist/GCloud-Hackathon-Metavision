import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
