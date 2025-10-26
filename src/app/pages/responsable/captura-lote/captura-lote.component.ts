import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GetAltasPendientesResult } from 'src/app/models/lotes/get-altas-pendientes-result';
import { LoteService } from 'src/app/services/lote.service';
import { Location } from '@angular/common';
import { InsAltasPendientesRequest } from 'src/app/models/lotes/ins-altas-pendientes-request';
import { GuardarLotesModel } from 'src/app/models/lotes/guardar-lotes-model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-captura-lote',
  templateUrl: './captura-lote.component.html',
  styleUrls: ['./captura-lote.component.css']
})
export class CapturaLoteComponent {
  showContent = false;
  isVisible = false;
  isLoading = true;
  isLoadingMdl = false;
  validateForm!: UntypedFormGroup;
  data:GetAltasPendientesResult[]=[];
  filteredData:GetAltasPendientesResult[]=[];

  altasSeleccionadas:GetAltasPendientesResult[]=[];
  alta:GetAltasPendientesResult;

  capturaLotes:InsAltasPendientesRequest[]=[];

  searchValue = '';

  ngOnInit() {
    

    this.validateForm = this.fb.group({
      articulo: [null, [Validators.required]]
    });
    this.loadData();
    
    
  }

  loadData(){
    this.loteService.GetAltasPendientes()
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
  private applyFilters(): any[] {
      
    return this.data.filter((data2) =>
      data2.numeroAltaContable.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  showCapturaLote(item:GetAltasPendientesResult): void{
    this.alta = item;
    this.altasSeleccionadas = this.data.filter((data2) =>
      data2.numeroAltaContable.toLowerCase() == item.numeroAltaContable.toLowerCase());

    this.capturaLotes= this.altasSeleccionadas.map(item => {
      return {
        id:item.id,
        anio:item.anio,
        numeroAltaContable: item.numeroAltaContable,
        gpo:item.gpo + '.' + item.gen + '.' + item.esp + '.' + item.dif + '.' + item.var,
        gen:item.gen,
        esp:item.esp,
        dif:item.dif,
        var:item.var,
        descripcionArticulo:item.descripcionArticulo,
        cantidadRecibida: item.recepcion,
        lote:'',
        fechaCaducidad:'',
      };
    });

    
    this.isVisible = true;
  }

  guardarLotes(){
    this.isLoadingMdl = true;

    var lotesGuardar:GuardarLotesModel[] = this.capturaLotes.map(item => {
      return {
        anio:item.anio,
        numeroAltaContable: item.numeroAltaContable,
        clave:item.gpo,
        lote:item.lote,
        caducidad:item.fechaCaducidad,
        cantidad:item.cantidadRecibida,
        tieneCartaCanje:item.tieneCartaCanje
      };
    });

    
    this.loteService.GuardarLotes(lotesGuardar)
    .subscribe({
      next: (response) => {
        this.isLoadingMdl = false;

        this.showContent = false;
        this.isVisible = false;
        this.isLoading = true;

        this.loadData();
      },
      complete:()=>{
        this.isLoadingMdl = false;
      },
      error:()=>{
        this.isLoadingMdl = false;
        this.msg.error("Favor de completar todos los campos.");
      }
    })
    
  }

  agregarLote(){
    console.log(this.validateForm);
      if (this.validateForm.valid) {
        console.log(this.validateForm.value.articulo);
        var item = this.data.find(item => item.id === this.validateForm.value.articulo);

        var request:InsAltasPendientesRequest = {
          id:item.id,
          anio:item.anio,
          numeroAltaContable: item.numeroAltaContable,
          gpo:item.gpo + '.' + item.gen + '.' + item.esp + '.' + item.dif + '.' + item.var,
          gen:item.gen,
          esp:item.esp,
          dif:item.dif,
          var:item.var,
          descripcionArticulo:item.descripcionArticulo,
          cantidadRecibida: item.recepcion,
          lote:'',
          fechaCaducidad:''
        };

        this.capturaLotes.push(request);
      } else {
        Object.values(this.validateForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    //this.capturaLotes.push({ dato: '' });
  }


  handleCancel() {
    this.isVisible = false;
  }

  exportToExcel(){
    this.excelService.exportToExcel(this.data);
  }

  constructor(
    private fb: UntypedFormBuilder,
    private loteService: LoteService,
    private msg: NzMessageService,
    private excelService:ExcelService
  ) { }
}
