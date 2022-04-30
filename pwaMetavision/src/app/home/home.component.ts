import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
  }

  options: AnimationOptions = {
    path: 'https://assets8.lottiefiles.com/packages/lf20_o6hQ8m.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
