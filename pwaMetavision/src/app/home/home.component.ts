import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  options: AnimationOptions = {
    path: 'https://assets8.lottiefiles.com/packages/lf20_o6hQ8m.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };
}
