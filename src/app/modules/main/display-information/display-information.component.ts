import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-display-information',
  templateUrl: './display-information.component.html',
  styleUrls: ['./display-information.component.scss']
})
export class DisplayInformationComponent implements OnInit {
  chart;
  pie:any;
  bar:any;
  filename:string='';
  @Input() set getFilename(val:string){
    this.filename=val;
  }
  type:string;
  @Input() set getType(val:string){
    this.type=val;
    this.updateChartType(this.type);
  }

  @Output() updateDate = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    // update current date to parent
    this.updateDate.emit(this.currentDate());
    
    

    
  }
  showPie=true;
  updateChartType(type:string){
    //update chart
    if(type== "Pie"){
      this.showPie=true;
      this.drawPie();
    }
    else{
      this.showPie=false;
      this.drawBar();

    }
    
  }
  drawBar(){
    this.bar = new Chart('Bar', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Combo Bar and line Chart'
        },
      },
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            type: 'bar',
            label: 'My First dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          },
          {
            type: 'line',
            label: 'Dataset 2',
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            data: [
              443, 256, 165, 100, 56, 65, 35, 543
            ],
            fill: false,
          },
          {
            type: 'bar',
            label: 'My Second dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false,
          }
        ]
      }
    });
  }

  drawPie(){
    this.pie = new Chart('Pie',{
      type: 'pie',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Pie Chart'
        },legend: {
					position: 'top',
				},animation: {
					animateScale: true,
					animateRotate: true
				}
      },
      data: {
				datasets: [{
					data: [45,10,5,25,15].reverse(),
					backgroundColor: ["red","orange","yellow","green","blue"],
					label: 'Dataset 1'
				}],
				labels: ['Red','Orange','Yellow','Green','Blue']
			}
    });
  }





  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

}
