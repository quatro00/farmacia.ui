import { DatePipe } from '@angular/common';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AltasService } from 'src/app/services/altas.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-reporte-altas',
  templateUrl: './reporte-altas.component.html',
  styleUrls: ['./reporte-altas.component.css']
})
export class ReporteAltasComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  isVisible = false;
  isVisibleCaptura = false;
  showContent = false;
  isLoading = true;
  btnLoadingBusqueda = false;
  validateForm!: UntypedFormGroup;
  validateFormBloqueo!: UntypedFormGroup;
  bloqueos:any[]=[];

  anio:number = null;
  altaContable:string = null;

  constructor(
    private modalService: NzModalService,
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private altasService:AltasService,
    private excelService:ExcelService
  ) { }

  exportToExcel(){
    this.excelService.exportToExcel(this.bloqueos);
  }

  ngOnInit() {

    this.isLoading = false;
    this.showContent = true;

    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
    });

    this.validateFormBloqueo = this.fb.group({
      centro: [null, [Validators.required]],
      riel: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      motivo: [null, [Validators.required]],
    });

  }

  verCaptura(item):void{
    console.log(item);
    this.isVisibleCaptura = true;
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {


      const formData = new FormData(); 
      
      formData.append('anio', this.anio.toString());
      formData.append('altaContable', this.altaContable);
      formData.append('archivo', event.target.files[0]);
      
      this.altasService.UploadFile(formData)
      .subscribe({
        next:(response)=>{
          this.msg.success("Archivo actualizado correctamente.");
          this.submitForm();
        }
      })


    }
  }

  subirDocumento(item){
    this.anio = item.anio;
    this.altaContable = item.numeroAltaContable;
    this.fileInput.nativeElement.click();
  }
  handleCancelCaptura(){
    this.isVisibleCaptura = false;
  }
  handleCancel() {
    this.isVisible = false;
  }

  eliminarDocumento(item){
    console.log(item);
    this.altasService.EliminarArchivo(item.idArchivo)
    .subscribe({
      next:(response)=>{
        this.msg.success("Archivo eliminado correctamente.");
        this.submitForm();
      }
    })
  }
  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();
    this.isVisible = true;
  }

  submitForm(){
    if (this.validateForm.valid) {
      this.btnLoadingBusqueda = true;
      this.altasService.GetAltas(this.validateForm.value.desde, this.validateForm.value.hasta)
      .subscribe({
        next:(response)=>{
          this.btnLoadingBusqueda = false;
          this.bloqueos = response;
        }
      })

    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
