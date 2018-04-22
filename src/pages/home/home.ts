import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private fdRedletterDaies:Array<string>;
  private fdFollowups:Array<string>;
  private fdPlans:Array<string>;
  private fdTasks:Array<string>;

  private barChart:any;
  @ViewChild('barCanvas') barCanvas;
  constructor(public navCtrl: NavController) {
    this.fdRedletterDaies=["12月8号是经视台蒋台的生日","2月8号是车友会李先生的生日","1月8号是夏哥的生日"];
    this.fdFollowups=["给沈建客户信息学院刘老师送酒","分销陈美沟通，要她逐渐开拓老公项目上用酒","房地产吴女士和郑总，以后定期回访。"];
    this.fdPlans=["继续回访客户","沈建3月用酒回款沟通","农行送发票"];
    this.fdTasks=["月度销售任务:100000,还差42000","年度任务：1000000，还差420000"];
  }
  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["月度任务", "年度任务" ],
        datasets: [{
          label: '完成情况',
          data: [{y:190,x:20}, {y:100,x:40}],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        },{
          label: '任务要求',
          data: [{y:120,x:20},{y:190,x:40}],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }
}
