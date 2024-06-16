import {Component, ElementRef, Input, SimpleChange, ViewChild} from '@angular/core';
import {JsonPipe,CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,
    JsonPipe, FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() tableData: any[] = [];
  @Input() rowsPerPage!:number;
  @Input() pageLimit=6;
  @Input() nestedKey?:{[key: string]: any};
@ViewChild('table') table!:ElementRef
  public startPage:number=1
  public totalPages!:number;
  public end:number=this.startPage+this.rowsPerPage;
  newTableData:any[]=[];
  public orderBy = 'desc';
  public icon ="pi pi-times";
  private left:number=1;
  private right:number=this.pageLimit;
  public isSelected=false;
  pageRange:number[]=[];




  ngOnChanges(changes:SimpleChange){
    for(let k in this.nestedKey){
      console.log(this.nestedKey[k])
    }

  if (changes.hasOwnProperty('tableData')) {

    this.totalPages= Math.ceil(this.tableData.length/this.rowsPerPage)
    this.onPageChange(this.startPage)
    this.onSort(this.headers[1],'desc')


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
 this.end=start+this.rowsPerPage;
    this.newTableData=this.tableData.slice(start,this.end)

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

public checkNested(data:{[key: string]: string|number|boolean|object},value:string):string|number|boolean|object {

  if (typeof (data[value]) !== "object") {

    return data[value]
  }
  else {

    for (let k in this.nestedKey) {
      if (k === value) {
        const nk = this.nestedKey[k];
       return this.checkNested(data[value] as {[key: string]: string|number|boolean|object}, nk);
      }
    }
  }
  return 'no data'
}
}
