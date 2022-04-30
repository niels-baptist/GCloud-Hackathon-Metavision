import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import User from '../user';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.sass']
})
export class GoalComponent implements OnInit {
  submitted = false;
  total_emission: number | undefined;
  lower_percentage: number | undefined;
  calculated_emission: number | undefined;

  constructor(private route: ActivatedRoute, public auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  private userCol = this.firestore.collection<User>("users");

  ngOnInit(): void {
    this.total_emission = Math.round(this.route.snapshot.params['total_emission']);
  }

  setLowerPercentage(percentage: number) {
    this.lower_percentage = percentage;
    this.calculated_emission = Math.round(this.route.snapshot.params['total_emission'] - (this.route.snapshot.params['total_emission'] * (percentage / 100)));
  }

  saveGoal() {
    if (this.lower_percentage != undefined) {
      this.submitted = true;

      this.auth.user.subscribe(user => {
        if (user) {
          this.userCol.add({ uid: user.uid.toString(), budget: (this.calculated_emission ?? 0), monthly_estimate: 0 })
        }
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
