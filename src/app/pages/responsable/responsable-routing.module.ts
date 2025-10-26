import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authAdminGuard } from 'src/app/guard/auth-admin.guard';
import { CapturaLoteComponent } from './captura-lote/captura-lote.component';
import { ReporteAltasComponent } from './reporte-altas/reporte-altas.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { ReporteMedicamentosCaducosComponent } from './reporte-medicamentos-caducos/reporte-medicamentos-caducos.component';
import { ReporteInventariosComponent } from './reporte-inventarios/reporte-inventarios.component';
import { CreateRequerimientoCatComponent } from './create-requerimiento-cat/create-requerimiento-cat.component';
import { ReporteCatalogoiiComponent } from './reporte-catalogoii/reporte-catalogoii.component';

const routes: Routes = [
  {
    path: 'captura-lote',
    component: CapturaLoteComponent,
    data: {
        title: 'Captura lote',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'reporte-altas',
    component: ReporteAltasComponent,
    data: {
        title: 'Reporte de altas',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'inventarios',
    component: InventariosComponent,
    data: {
        title: 'Inventarios',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'medicamentos-caducos',
    component: ReporteMedicamentosCaducosComponent,
    data: {
        title: 'Medicamentos caducos',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'reporte-inventarios',
    component: ReporteInventariosComponent,
    data: {
        title: 'Reporte de Inventarios',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'create-requerimiento-cat',
    component: CreateRequerimientoCatComponent,
    data: {
        title: 'Crear requerimiento catalogo II',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'reporte-catalogoii',
    component: ReporteCatalogoiiComponent,
    data: {
        title: 'Reporte catalogo II',
    },
    //canActivate: [authAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableRoutingModule { }
