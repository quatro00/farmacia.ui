import { Component, ViewChild } from '@angular/core';
import overviewData from '../../../../assets/data/pages/demo-one/overviewData.json';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexStates,
  ApexFill,
} from "ng-apexcharts";
import { DatePipe } from '@angular/common';
import { LoteService } from 'src/app/services/lote.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  states: ApexStates;
  fill: ApexFill;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showContent = false;
  altasPendientes:number = 0;
  medicamentosCaducos:number = 0;
  diasUltimoInventario:number = 0;
  fechas:string[]=[];
  appOverviewData = overviewData;
  filteredOverviewData = this.appOverviewData.filter(item => item.id >= 5 && item.id <= 8);



  ngOnInit() {
    this.showContent = true;

    let fechaActual = new Date();

    for (let i = 1; i <= 15; i++) {
      this.fechas.push(this.datePipe.transform(fechaActual, 'dd/MMM/yy', 'es'));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    this.loteService.GetAltasPendientes()
    .subscribe({
      next: (response) => {
        this.altasPendientes = response.length;
      }
    })

    this.loteService.GetMedicamentosCaducos()
    .subscribe({
      next: (response) => {
        this.medicamentosCaducos = response;
      }
    })

    this.loteService.GetDiasDesdeUltimoInventario()
    .subscribe({
      next: (response) => {
        this.diasUltimoInventario = response;
      }
    })
    
    this.loteService.GetCaducidadDashboard()
    .subscribe({
      next: (response) => {
        console.log('response!', response);
        this.chartOptions = {
          series: [{
            name: "Medicamentos a caducar",
            data: response.disponible,
          }],
          colors: ["#8231D3"],
          fill: {
            type: "gradient",
            gradient: {
              opacityFrom: 0.5,
              opacityTo: 0
            }
          },
          chart: {
            id: "chartLine",
            height: 300,
            type: "area",
            parentHeightOffset: 0,
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 3,
            dashArray: 0,
          },
          grid: {
            borderColor: '#485e9029',
            strokeDashArray: 5,
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 2,
            }
          },
          legend: {
            show: false,
          },
          tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: false,
            intersect: false,
            x: {
              show: true,
              format: 'dd MMM',
              formatter: undefined,
            },
            y: {
              formatter: undefined,
              title: {
                formatter: (seriesName) => seriesName,
              },
            },
            marker: {
              show: true,
            },
            style: {
              fontSize: '12px',
              fontFamily: '"Jost", sans-serif',
            },
          },
          xaxis: {
            crosshairs: {
              show: false
            },
            labels: {
              style: {
                colors: Array.from({
                  length: 12
                }, () => '#747474'),
                fontSize: '14px',
                fontFamily: '"Jost", sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
              },
            },
            categories: response.dias,
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              offsetX: -15,
              formatter: (val) => {
                return val + "";
              },
              style: {
                colors: ['#747474'],
                fontSize: '14px',
                fontFamily: '"Jost", sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
        };
      },

    })
    
  }


  //--------
  sellingTab: string = 'week';
  handleClick(tab: string): void {
    this.sellingTab = tab;
  }

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;


  constructor(private datePipe: DatePipe, private loteService: LoteService,) {
  


   
  }

}
