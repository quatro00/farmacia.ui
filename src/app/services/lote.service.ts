import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { GetAltasPendientesResult } from '../models/lotes/get-altas-pendientes-result';
import { GuardarLotesModel } from '../models/lotes/guardar-lotes-model';
import { GetCaducidadDashboardModel } from '../models/lotes/get-caducidad-dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  service:string = 'Lote';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  GetAltasPendientes():Observable<GetAltasPendientesResult[]>{
    return this.http.get<GetAltasPendientesResult[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAltasPendientes`);
  }

  GetMedicamentosCaducos():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetMedicamentosCaducos`);
  }

  GetDiasDesdeUltimoInventario():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetDiasDesdeUltimoInventario`);
  }

  GetCaducidadDashboard():Observable<GetCaducidadDashboardModel>{
    return this.http.get<GetCaducidadDashboardModel>(`${environment.apiBaseUrl}/api/${this.service}/GetCaducidadDashboard`);
  }

  GuardarLotes(request:GuardarLotesModel[]):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/GuardarLotes`,request);
  }

  GetMedicamentosCaducosDetalle():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetMedicamentosCaducosDetalle`);
  }

  GetInventario():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetInventario`);
  }
}