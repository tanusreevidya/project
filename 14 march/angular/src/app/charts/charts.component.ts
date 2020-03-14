import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { UploadService } from '../adminhome/importdata/upload.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent  {
   compareData: any;
   constructor(private uploadService: UploadService, private route: ActivatedRoute) { }
   chartOne = Highcharts;
   chartOneOptions: any;
   getFirstDataComplete: boolean = false;
   getSecondDataComplete: boolean = false;
   ngOnInit() {
      this.compareData = JSON.parse(this.route.snapshot.queryParams.formData);
      console.log(this.compareData);
      
       let series: any = []
           let categories: any[] = [];
           this.uploadService.getCompanyStockPricesBetween(this.compareData.cnsn, this.compareData.seselect, this.compareData.fperiod, this.compareData.tperiod).subscribe(data => {
               let companyOneData: any[] = [];
                console.log(companyOneData)
               data.forEach((stockPrice) => {
                   categories.push(stockPrice.dataPoint);
                   companyOneData.push(stockPrice.dataValue)
               })
               let seriesDataMemberOne = {
                   name: this.compareData.cnsn + " (" + this.compareData.seselect + ")",
                   data: companyOneData
               }
               series[0] = seriesDataMemberOne;
               this.getFirstDataComplete = true;
           });
           this.uploadService.getCompanyStockPricesBetween(this.compareData.ctcnsn, this.compareData.seselect, this.compareData.fperiod, this.compareData.tperiod).subscribe(data => {
               let companyTwoData: any[] = [];
               data.forEach((stockPrice) => {
                   if (categories.includes(stockPrice.dataPoint)) {
                       companyTwoData.push(stockPrice.dataValue)
                   }
               })
               let seriesDataMemberTwo = {
                   name: this.compareData.ctcnsn + " (" + this.compareData.seselect + ")",
                   data: companyTwoData
               }
               series[1] = seriesDataMemberTwo;
               this.getSecondDataComplete = true;
           });
           this.chartOneOptions = {
               chart: {
                   type: "column"
               },
               title: {
                   text: "Stock Comparision Chart"
               },
               xAxis: {
                   categories: categories
               },
               yAxis: {
                   title: {
                       text: "Stock Price"
                   }
               },
               series: series
           }
       }
}
