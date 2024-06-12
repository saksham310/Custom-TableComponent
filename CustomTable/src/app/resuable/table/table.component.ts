import {Component, ElementRef, Input, SimpleChange, ViewChild} from '@angular/core';
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
  newTableData:any[]=[];
  public orderBy = 'desc';
  icon='pi pi-sort-alt'
  testIndex=1;
@ViewChild('table') table!:ElementRef



ngOnChanges(changes:SimpleChange){
  if (changes.hasOwnProperty('tableData')) {
    this.onPageChange(1)
    this.onSort(this.headers[1],'desc')
  }

}
  onSort(value: string, orderType: string) {
    if(orderType=='desc'){
      this.orderBy='asc'
      this.newTableData=this.newTableData.sort((a,b):number=>{
        return a[value]>b[value]?1:-1;

      })
    }
    else{
      this.orderBy='desc'
      this.newTableData=this.newTableData.sort((a,b):number=>{
        return a[value]<b[value]?1:-1;
    })

  }
}
  onPageChange(start:number){
  start=25*(start-1);
  const end=start+25;
    this.newTableData=this.tableData.slice(start,end)
  }
}
