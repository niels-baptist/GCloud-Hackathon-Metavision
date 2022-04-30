import { Component, Input, OnInit } from '@angular/core';
import { ClimatiqService } from '../climatiq.service';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import Profile from '../profile';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent implements OnInit {
  @Input() power!: number;
  @Input() travel!: number;
  @Input() amount_shower!: number;
  @Input() time_shower!: number;

  submitted = false;

  // Showering for a minute consumes on average 11 liters / minute
  shower_consumption_per_minute: number = 11; 

  constructor(
    private climatiqService: ClimatiqService, 
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  private profileCol = this.firestore.collection<Profile>("profiles");

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.power && this.travel && this.amount_shower && this.time_shower) {
      this.submitted = true;

      let liters = (this.time_shower * this.shower_consumption_per_minute) * this.amount_shower * 4;

      this.climatiqService.estimateEmission(this.power, this.travel, liters).subscribe(result => {
        let total_emission = 0;
        result.results.map(r => {
          total_emission += r.co2e;
        });

        this.auth.user.subscribe(user => {
          if (user) {
            this.profileCol.add({ uid: user.uid.toString(), power_kwh: this.power, travel_km: this.travel, water_l: liters, total_emission: total_emission })
          }
          this.router.navigate(['/goal', { total_emission: total_emission }]);
        });
      });
    }
  }

}
