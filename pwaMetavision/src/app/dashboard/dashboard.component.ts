import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import Activity_log from './activity_log';
import Activity from './activity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  authUser: any;
  public activities!: Activity[];
  private activity_logs_col!: AngularFirestoreCollection<Activity_log>;
  private activities_col!: AngularFirestoreCollection<Activity>;
  public activity_log_array_observable!: Observable<Activity_log[]>;
  public activity_log_array!: Activity_log[];
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  async add_activity_log(Activity_log: Activity_log) {
    const user = await this.auth.currentUser;
    this.activity_logs_col = this.firestore.collection<Activity_log>('users/' + user?.uid + '/activity_logs');
    this.activity_logs_col.add(Activity_log);
  }

  async get_activity_logs() {

    const user = await this.auth.user;
    user.subscribe(
      async (user) => {
        this.authUser = user;
        this.activity_logs_col = this.firestore.collection<Activity_log>('users/' + user?.uid + '/activity_logs');
        this.activity_log_array_observable = this.activity_logs_col.valueChanges();
        this.activity_log_array_observable.subscribe(
          (activity_log_array) => {
            this.activity_log_array = activity_log_array;
          }
        );
      }

    )
  }

  async add_electricity() {
    const user = await this.auth.currentUser;
    const user_id = user?.uid.toString();
    let Activity_log = {
      activity_name: 'Electricity',
      activity_id: 'tQUwJb9r6uYJBvztNHmV',
      uid: user_id || '',
      datetime: new Date(),
      amount_metric: "1.45 kWh",
      total_co2: 0.338
    };
    this.add_activity_log(Activity_log);
  }

  async add_showering() {
    const user = await this.auth.currentUser;
    const user_id = user?.uid.toString();
    let Activity_log = {
      activity_name: 'Showering',
      activity_id: 'TObT8AFWybZu2ymZhoMN',
      uid: user_id || '',
      datetime: new Date(),
      amount_metric: "100 L",
      total_co2: 0.298
    };
    this.add_activity_log(Activity_log);
  }
async get_activities(){
  this.activities_col = this.firestore.collection<Activity>('activities');

  this.activities_col.valueChanges().subscribe(act => {
    this.activities = act;
  });

}
  async add_transportation() {
    const user = await this.auth.currentUser;
    const user_id = user?.uid.toString();
    let Activity_log = {
      activity_name: 'Transportation',
      activity_id: 'VYLT0JRWtEwRqXQFNXSt',
      uid: user_id || '',
      datetime: new Date(),
      amount_metric: "100 km",
      total_co2: 0.298
    };
    this.add_activity_log(Activity_log);
  }

  ngOnInit(): void {
    this.init();

  }
  init() {
    this.get_activities();
    this.get_activity_logs();
  }
}
