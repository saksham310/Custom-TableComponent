import {Component, Input} from '@angular/core';
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
@Input() headers:string[]=[];
@Input() tableData:any[]=[];

public orderBy='desc';



onSort(event:Event,value:string,orderBy:string){
const header=event.target as HTMLElement
  const column:string=value;
  const order:string=orderBy;

  if(order=='desc'){
    this.orderBy='asc'
    this.tableData=this.tableData.sort((a,b):number  =>{
      return a[column]>b[column]?1:-1;

    })
  }
  else{
    this.orderBy='desc'
    this.tableData=this.tableData.sort((a,b):number  =>{
      return a[column]<b[column]?1:-1;

    })
  }
  console.log(column,order)
}
}
