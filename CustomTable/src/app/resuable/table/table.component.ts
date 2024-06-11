import {Component, Input, OnInit} from '@angular/core';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() tableData: any[] = [];
  public orderBy = 'desc';


  onSort(value: string, orderType: string) {
    if(orderType=='desc'){
      this.orderBy='asc'
      this.tableData=this.tableData.sort((a,b):number=>{
        return a[value]>b[value]?1:-1;

      })
    }
    else{
      this.orderBy='desc'
      this.tableData=this.tableData.sort((a,b):number=>{
        return a[value]<b[value]?1:-1;
    })

  }
}}
