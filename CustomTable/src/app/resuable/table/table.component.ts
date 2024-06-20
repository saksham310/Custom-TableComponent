import {Component, ElementRef, EventEmitter, Input, Output, SimpleChange, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NestedData} from "../../models/nested-data";
import {OrderInterface} from "../../models/order.interface";
import {TableActionsComponent} from "../table-actions/table-actions.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,
    FormsModule, TableActionsComponent
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
  @Input() showCheckBox:boolean=false;
  @Input() enableFocus:boolean=false;
  @Input() focusColor:string='#e4d8ff';
  @Output() rowEmitter=new EventEmitter();
@ViewChild('table') table!:ElementRef;
  public startPage:number=1;
  public totalPages!:number;
  public end:number=this.startPage+this.rowsPerPage;
  newTableData:any[]=[];
  public order:OrderInterface={};
  public iconStyle:OrderInterface={};
  private left:number=1;
  private right:number=this.pageLimit;
  public isSelected=false;
  pageRange:number[]=[];
public isFocused:string='';
  public focusedRowIndex:number=0;
  public selectedRow:string[]=[]




  ngOnChanges(changes:SimpleChange){

  if (changes.hasOwnProperty('tableData')) {

    this.totalPages= Math.ceil(this.tableData.length/this.rowsPerPage)
    this.onPageChange(this.startPage)
    this.onSort(this.headers[1],'desc')


  }

}
  public onSort(value: string, orderType: string) {

    for(let k in this.headers){
      const current=this.headers[k]
      if(current===value){
        if(orderType=='desc'){
          this.order[current]='asc'
          this.iconStyle[current]="pi pi-sort-amount-up"

          this.newTableData=this.newTableData.sort((a,b):number=>{
            return a[value]>b[value]?1:-1;

          })
        }
        else{
          this.order[value]='desc'
          this.iconStyle[value]="pi pi-sort-amount-down"
          this.newTableData=this.newTableData.sort((a,b):number=>{
            return a[value]<b[value]?1:-1;
          })
      }
    }else{
      this.order[current]="desc"
      this.iconStyle[current]="pi pi-sort-alt"}

  }
}
  public onPageChange(start:number){
  this.startPage=start
    this.generateRange();
  start=this.rowsPerPage*(start-1);
 this.end=start+this.rowsPerPage;
    this.newTableData=this.tableData.slice(start,this.end)

  }

  private calculatePageRange(){
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

  private generateRange(){
  this.calculatePageRange();

    this.pageRange=[];
  for(let i=this.left;i<=this.right;i++){

this.pageRange.push(i);
  }
  }

public checkNested(data:NestedData,value:string):string|NestedData {

  if (typeof (data[value]) !== "object") {

    return data[value]
  }
  else {

    for (let k in this.nestedKey) {
      if (k === value) {
        const nk = this.nestedKey[k];
       return this.checkNested(data[value] as NestedData, nk);
      }
    }
  }
  return 'no data'
}

public  showFocus(val:string,index:number){
    this.selectedRow.push(val);
    this.rowEmitter.emit(this.selectedRow)
    if(this.enableFocus){
  this.isFocused=val;
  this.focusedRowIndex=index;
}
}}
