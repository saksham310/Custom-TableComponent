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
  @Input() rowsPerPage!:number;
  private startPage:number=0
  public totalPages!:number;
  newTableData:any[]=[];
  public orderBy = 'desc';
  icon='pi pi-sort-alt'
@ViewChild('table') table!:ElementRef



  ngOnChanges(changes:SimpleChange){
  if (changes.hasOwnProperty('tableData')) {
    this.totalPages= Math.ceil(this.tableData.length/this.rowsPerPage)
    this.onPageChange(this.startPage)
    this.onSort(this.headers[1],'desc')
    console.log(this.totalCount(this.totalPages));

  }

}
  public onSort(value: string, orderType: string) {
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
  public onPageChange(start:number){
  start=this.rowsPerPage*(start);
  const end=start+this.rowsPerPage;
    this.newTableData=this.tableData.slice(start,end)
  }


  public totalCount(num:number){
    return Array(num);
  }
}
