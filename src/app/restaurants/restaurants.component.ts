import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  csvUrl: any = 'assets/euro_restrobeee02c.csv';
  // csvUrl: any = 'assets/convertcsv1.csv';
  lines:any = [];
  thead:any =[];
  tbody:any=[];
  p: number = 1;
  constructor(private http: HttpClient) {
    this.readCsvData();
  }
  ngOnInit() {
  }
  readCsvData() {
    this.http.get(this.csvUrl, { responseType: 'text' })
      .subscribe(
        data => {
          let allTextLines = data.split(/\r|\n|\r/);
          console.log('length: '+allTextLines.length);
          let headers = allTextLines[0].split(',');
          let data1=allTextLines[0].split(',');
          if (data1.length === headers.length) {
            for (let j = 0; j < headers.length; j++) {
              this.thead.push(data1[j]);
            }
          }
          // allTextLines.length
          for (let i = 1; i < allTextLines.length; i++) {
            
            // split content based on comma
            // if(i>100){
            //   break;
            // }
            let data2 = allTextLines[i].split(',');
            // console.log("headers length: "+headers.length);
            // console.log("data2 length: "+data2.length);
            if (data2.length === headers.length) {
              // console.log('reached here');
              let tarr = [];
              for (let j = 0; j < headers.length; j++) {
                tarr.push(data2[j]);
              }
              this.lines.push(tarr);
            }
          }
          console.log(">>>>>>>>>>>>>>>>>", this.lines);
          for(let i=0;i<100;i++){
            this.tbody.push(this.lines[i]);
          }
        },
        err => {
          console.log(err)
        });
  }
  
}
