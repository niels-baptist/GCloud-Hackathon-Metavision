import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import ApiResponse from './api_response';

@Injectable({
  providedIn: 'root'
})
export class ClimatiqService {

  constructor(private httpClient: HttpClient) { }

  estimateEmission(power_kwh: number, travel_km: number, water_l: number): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer SE5AKBAFAS41PYN1WGKF195VFMZ2`
    });
    
    let data = [
      {
        "emission_factor": "commercial_vehicle-vehicle_type_hgv-fuel_source_bev-engine_size_na-vehicle_age_post_2015-vehicle_weight_gt_10t_lt_12t",
        "parameters": {
          "distance": travel_km,
          "distance_unit": "km"
        }
      },
      {
        "emission_factor": "water-treatment",
        "parameters": {
          "volume": water_l,
          "volume_unit": "l"
        }
      },
      {
        "emission_factor": "electricity-energy_source_coal_fired_plant",
        "parameters": {
          "energy": power_kwh,
          "energy_unit": "kWh"
        }
      }
    ];

    return this.httpClient.post<ApiResponse>("https://beta3.api.climatiq.io/batch", data, { headers: headers });
  }
}
