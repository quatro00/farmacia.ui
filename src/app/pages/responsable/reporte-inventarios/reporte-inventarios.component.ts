import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AltasService } from 'src/app/services/altas.service';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-reporte-inventarios',
  templateUrl: './reporte-inventarios.component.html',
  styleUrls: ['./reporte-inventarios.component.css']
})
export class ReporteInventariosComponent {

  
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
    private loteService: LoteService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  private applyFilters(): any[] {
      
    return this.data.filter((data2) =>
      data2.lote.toLowerCase().includes(this.searchValue.toLowerCase()) ||
    data2.esp.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  loadData(){
    this.loteService.GetInventario()
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
