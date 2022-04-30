import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';

interface User {
  uid: string;
  budget: number;
  monthlyEstimate: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}
  private userCol!: AngularFirestoreCollection<User>;
  ngOnInit(): void {}

  options: AnimationOptions = {
    path: 'https://assets8.lottiefiles.com/packages/lf20_o6hQ8m.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  async login() {
    await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    await this.auth.user.subscribe((user) => {
      if (user) {
        this.userCol = this.firestore.collection<User>('users');

        this.userCol.doc(user.uid).set({
          uid: user.uid,
          budget: 0,
          monthlyEstimate: 0,
        });

        this.router.navigate(['/setup']);
      }
    });
  }
}
