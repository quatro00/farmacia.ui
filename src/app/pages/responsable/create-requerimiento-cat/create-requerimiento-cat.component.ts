import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RequerimientoCatalogoIIService } from 'src/app/services/requerimiento.service';

@Component({
  styles:  [`
    :host ::ng-deep .basic-select .ant-select-selector{
      @apply h-[50px] rounded-4 border-normal px-[20px] flex items-center dark:bg-white/10 dark:border-white/10 dark:text-white/60 dark:hover:text-white/100;
    }
    :host ::ng-deep .basic-select.ant-select-multiple .ant-select-selection-item{
        @apply bg-white dark:bg-white/10 border-normal dark:border-white/10;
      }
      ::ng-deep .ant-upload {
        @apply w-full;
      }
      :host ::ng-deep .basic-select .ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector{
        @apply dark:bg-white/10 dark:border-white/10 dark:text-white/60 dark:hover:text-white/100;
      }
    `],
  selector: 'app-create-requerimiento-cat',
  templateUrl: './create-requerimiento-cat.component.html',
  styleUrls: ['./create-requerimiento-cat.component.css']
})
export class CreateRequerimientoCatComponent {
  showContent = false;
  isVisible = false;
  isLoading = true;
  btnLoading=false;
  validateForm!: UntypedFormGroup;
  archivo:any;

  constructor(private msg: NzMessageService, private fb: FormBuilder, private requerimientoCatalogoIIService:RequerimientoCatalogoIIService) {}


  isDarkMode(): boolean {
    return false;//this.document.body.classList.contains('dark');
  }
  
  validateInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    
    // Solo permitir números
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      this.archivo = event.target.files[0];
    }
    else{
      this.archivo = null;
    }
  }

  submitForm(){
    if (this.validateForm.valid) {
      this.btnLoading=true;

      const formData = new FormData(); 

      let request :any = 
      {
        folio:this.validateForm.value.folio,
        nss:this.validateForm.value.nss,
        agregado:this.validateForm.value.agregado,
        nombrePaciente:this.validateForm.value.nombrePaciente,
        diagnostico:this.validateForm.value.diagnostico,
        claveMedicamento:this.validateForm.value.claveMedicamento,
        requerimientoMensual:this.validateForm.value.requerimientoMensual,
        meses:this.validateForm.value.meses,
        piezas:this.validateForm.value.piezas,
        fechaVencimiento:this.validateForm.value.fechaVencimiento,
        observaciones:this.validateForm.value.observaciones,
        fechaEvaluacion:this.validateForm.value.fechaEvaluacion,
        //archivo:this.validateForm.value.archivo,
      }
      
      formData.append('folio', request.folio);
      formData.append('agregado', request.agregado);
      formData.append('nss', request.nss);
      formData.append('nombrePaciente', request.nombrePaciente);
      formData.append('diagnostico', request.diagnostico);
      formData.append('claveMedicamento', request.claveMedicamento);
      formData.append('requerimientoMensual', request.requerimientoMensual);
      formData.append('meses', request.meses);
      formData.append('piezas', request.piezas);
      formData.append('fechaVencimiento', request.fechaVencimiento);
      formData.append('observaciones', request.observaciones);
      formData.append('fechaEvaluacion', request.fechaEvaluacion);
      if(this.archivo != null){
        formData.append('archivo', this.archivo);  
      }
      this.requerimientoCatalogoIIService.InsRequerimiento(formData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.validateForm.reset();
          this.msg.success("Solicitud registrada con éxito.");
        },
        complete:()=>{
          this.btnLoading = false;
        },
        error:()=>{
          this.btnLoading = false;
        }
      })
/*
      this.asnService.GetAsnPorFecha(proveedorId, fechaInicio, fechaTermino)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.bloqueos = response;
        },
        complete:()=>{
          this.btnLoading = false;
        },
        error:()=>{
          this.btnLoading = false;
        }
      })
      */
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  crearRequerimiento(event): void {

    /*
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
    */
  }

  ngOnInit() {
    

    this.validateForm = this.fb.group({
      nss: ['',[Validators.required]],//
      nombrePaciente: ['',[Validators.required]],//
      folio: ['',[Validators.required]],//
      diagnostico: ['',[Validators.required]],//
      claveMedicamento: ['',[Validators.required]],//
      requerimientoMensual: ['',[Validators.required]],//
      meses: ['',[Validators.required]],
      piezas: ['',[Validators.required]],
      fechaVencimiento: ['',[Validators.required]],
      observaciones: ['',[Validators.required]],//
      fechaEvaluacion: ['',[Validators.required]],
      agregado: ['',[Validators.required]],
      archivo: [''],
      //prioridad: ['',[Validators.required]],
      //descripcion: ['',[Validators.required]]
    });

    this.loadData();
  }

  loadData(){

    this.isLoading = false;
    this.showContent = true;

    /*
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
    */
  }
}
