import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AltasService } from 'src/app/services/altas.service';
import { RequerimientoCatalogoIIService } from 'src/app/services/requerimiento.service';

@Component({
  selector: 'app-reporte-catalogoii',
  templateUrl: './reporte-catalogoii.component.html',
  styleUrls: ['./reporte-catalogoii.component.css']
})
export class ReporteCatalogoiiComponent {
  showContent = false;
  isLoading = true;

  
  data:any[]=[];
  filteredData:any[]=[];

  searchValue = '';
  
  constructor(
    private modalService: NzModalService,
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private altasService:AltasService,
    private requerimientoCatalogoIIService: RequerimientoCatalogoIIService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  private applyFilters(): any[] {
      
    return this.data.filter((data2) =>
      data2.folio.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.nss.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.nombre.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.diagnostico.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.observaciones.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.requerimientoMensual.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.clave.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    
    data2.fechaVencimiento.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.fechaEvaluacion.toLowerCase().includes(this.searchValue.toLowerCase()) 
    );
  }


  loadData(){
    this.requerimientoCatalogoIIService.GetRequerimientos()
    .subscribe({
      next: (response) => {
        this.data = response;
        this.filteredData = response;

        this.isLoading = false;
        this.showContent = true;
      },
      complete:()=>{
        //this.btnLoading = false;
      },
      error:()=>{
        //this.btnLoading = false;
      }
    })
  }

  /*
  ngOnInit() {
    this.isLoading = false;
    this.showContent = true;
  }
  */
}

