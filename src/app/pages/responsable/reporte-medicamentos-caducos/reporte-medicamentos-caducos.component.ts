import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AltasService } from 'src/app/services/altas.service';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-reporte-medicamentos-caducos',
  templateUrl: './reporte-medicamentos-caducos.component.html',
  styleUrls: ['./reporte-medicamentos-caducos.component.css']
})
export class ReporteMedicamentosCaducosComponent {

  showContent = false;
  isLoading = true;

  
  data:any[]=[];
  filteredData:any[]=[];

  constructor(
    private modalService: NzModalService,
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private altasService:AltasService,
    private loteService: LoteService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.loteService.GetMedicamentosCaducosDetalle()
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
