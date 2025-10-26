import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-carga-reportes',
  templateUrl: './carga-reportes.component.html',
  styleUrls: ['./carga-reportes.component.css']
})
export class CargaReportesComponent {

  validateFormFactura!: UntypedFormGroup;
  isLoading = true;
  isLoadingMdl = true;
  showContent = false;
  isVisible = false;
  btnLoading = false;
  csv:any=null;

  ngOnInit() {
    this.isLoading = false;
    this.isLoadingMdl = false;
    this.showContent = true;

    this.validateFormFactura = this.fb.group({
      csv: [null, [Validators.required]]
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  onFileSelectPdf(event): void {
    if (event.target.files.length > 0) {
      this.csv = event.target.files[0];
      console.log(event.target.files[0]);
    }
  }

  submitForm(){
    const formData = new FormData();
    this.btnLoading = true;

    formData.append('csvFile',this.csv);
    
    this.configuracionService.UploadReporteAltas(formData)
    .subscribe({
      next: (response) => {
        this.isVisible = false;
        this.isLoadingMdl = false;
      },
      complete:()=>{
        this.btnLoading = false;
      },
      error:()=>{
        this.btnLoading = false;
      }
    })
    console.log(formData);
  }

  constructor(
    private fb: UntypedFormBuilder,
    private configuracionService: ConfiguracionService,
  ) { }
}
