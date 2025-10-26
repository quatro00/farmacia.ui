import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CrearInventarioRequestModel } from 'src/app/models/inventario/crear-inventario-request-model';
import { RegistraConteoRequestModel } from 'src/app/models/inventario/registra-conteo-request-model';
import { ExcelService } from 'src/app/services/excel.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  showContent = false;
  isVisible = false;
  isVisibleCaptura = false;

  isLoadingConteoMdl = false;
  isLoading = true;
  isLoadingMdl = false;
  validateForm!: UntypedFormGroup;
  data:any[]=[];
  detalleConteo:any[]=[];
  filteredData:any[]=[];
  inventarioId:string='';
  conteo:RegistraConteoRequestModel[]=[];

  ngOnInit() {
    

    this.validateForm = this.fb.group({
      responsable: [null, [Validators.required]],
      responsablePuesto: [null, [Validators.required]],
      responsableConteo: [null, [Validators.required]],
      responsableConteoPuesto: [null, [Validators.required]],
      generado: [null, [Validators.required]],
      generadoPuesto: [null, [Validators.required]],
    });
    this.loadData(); 
  }

  showCaptura(id){
    this.inventarioService.GetInventario(id)
    .subscribe({
      next: (response) => {
        response.detalle.forEach(item => {
          item.caducidad = item.caducidad.substring(0, 10);
        });

        this.detalleConteo = response.detalle;
        this.isVisibleCaptura = true;
        console.log(this.detalleConteo);
        
      },
      complete:()=>{
        //this.isLoadingMdl = false;
      },
      error:()=>{
        
      }
    })
  }
  descargarControlInventario(id){
    window.open(`${environment.apiBaseUrl}/api/Inventario/GetControlCaducidadesConteo/${id}`, '_blank');
  }

  descargarControlInventarioLleno(id){
    window.open(`${environment.apiBaseUrl}/api/Inventario/GetControlCaducidadesLleno/${id}`, '_blank');
  }

  adjuntarControlInventario(item:any){
    this.inventarioId = item.inventarioId;
    console.log(item);
    this.modalService.confirm({
      nzTitle: '¿Está seguro?',
      nzContent: 'Al adjuntar el control de caducidades el inventario se vera afectado por dichos movimientos.',
      nzOkText: 'Sí',
      nzOkType: 'primary',
      nzOnOk: () => this.onConfirm(),
      nzCancelText: 'No',
      nzOnCancel: () => this.onCancel()
    });
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {

      this.isLoading = true;
      this.showContent = false;

      const formData = new FormData(); 
      
      formData.append('inventarioId', this.inventarioId);
      formData.append('archivo', event.target.files[0]);
      
      console.log('inventarioId!',this.inventarioId);
      this.inventarioService.UploadControlInventarios(formData)
      .subscribe({
        next:(response)=>{
          this.msg.success("Archivo actualizado correctamente.");
          this.loadData();
        }
      })


    }
  }

  onConfirm(): void {
    //this.anio = item.anio;
    //this.altaContable = item.numeroAltaContable;
    this.fileInput.nativeElement.click();
  }

  onCancel(): void {
    console.log('Cancelado');
  }

  guardarConteo(){
    this.isLoadingConteoMdl = true;
    
    this.conteo= this.detalleConteo.map(item => {
      return {
        inventarioId:item.inventarioId,
        loteId:item.loteId,
        conteo: item.consumo,
      };
    });

    this.inventarioService.RegistraConteo(this.conteo)
    .subscribe({
      next: (response) => {
        this.isLoadingConteoMdl = false;

        this.isVisibleCaptura = false;
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
  guardarLotes(){
    this.isLoadingMdl = true;

    var request:CrearInventarioRequestModel = {
      generado: this.validateForm.value.generado,
      generadoPuesto: this.validateForm.value.generadoPuesto,
      responsable: this.validateForm.value.responsable,
      responsablePuesto: this.validateForm.value.responsablePuesto,
      responsableConteo: this.validateForm.value.responsableConteo,
      responsableConteoPuesto: this.validateForm.value.responsableConteoPuesto,
    }

    this.inventarioService.CrearInventario(request)
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

  loadData(){
    this.inventarioService.GetInventarios()
    .subscribe({
      next: (response) => {
       console.log(response);
       this.data=response;
       this.filteredData = response;
       this.isLoading = false;
       this.showContent = true;
      },
      complete:()=>{
        //this.isLoadingMdl = false;
      },
      error:()=>{
        this.isLoadingMdl = false;
        this.msg.error("Favor de completar todos los campos.");
      }
    })
   
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleCancelCaptura(){
    this.isVisibleCaptura = false;
  }
  showNew(): void{
   
    this.isVisible = true;
  }

  exportToExcel(){
    this.excelService.exportToExcel(this.data);
  }

  
  constructor(
    private fb: UntypedFormBuilder,
    private inventarioService: InventarioService,
    private msg: NzMessageService,
    private modalService:NzModalService,
    private excelService:ExcelService
  ) { }
}
