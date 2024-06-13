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
  public startPage:number=1
  public totalPages!:number;
  newTableData:any[]=[];
  public orderBy = 'desc';
  icon ="pi pi-times"
  public pageLimit=5;
  private left:number=1;
  private right:number=this.pageLimit;
  pageRange:number[]=[];
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
  this.startPage=start
    this.generateRange();
  start=this.rowsPerPage*(start-1);
  const end=start+this.rowsPerPage;
    this.newTableData=this.tableData.slice(start,end)

  }

  calculatePageRange(){
  this.left=this.startPage-Math.floor(this.pageLimit/2)
    this.right=this.startPage+Math.floor(this.pageLimit/2)
    if(this.left<1){
      this.left=1;
      this.right=this.pageLimit;
    }
    if(this.right>this.totalPages){
      this.right=this.totalPages;
      this.left=this.totalPages-(this.pageLimit-1)<1?1:this.totalPages-(this.pageLimit-1);
    }
  }

  generateRange(){
  this.calculatePageRange();
  console.log(this.left,this.right);
    this.pageRange=[];
  for(let i=this.left;i<=this.right;i++){

this.pageRange.push(i);
  }
  }
  public totalCount(num:number){
    return Array(num);
  }
}
