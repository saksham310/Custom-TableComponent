import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NestedData} from "../../models/nested-data";
import {OrderInterface} from "../../models/order.interface";
import {TableActionsComponent} from "../table-actions/table-actions.component";
import {CommonDataInterface} from "../../models/common-data.interface";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,
    FormsModule, TableActionsComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit,OnChanges{

  public data:CommonDataInterface={
    currentData:[],
    startPage:1,
    endPage:0,
    totalPages:1,
    pageRange:[],
    leftMax:1,
    rightMax:0
  };

  // @ Receiving data from parent
  @Input() headers: string[] = [];
  @Input() tableData: any[] = [];
  @Input() rowsPerPage!: number;
  @Input() pageLimit = 6;
  @Input() nestedKey?: { [key: string]: any };
  @Input() showCheckBox: boolean = false;
  @Input() enableFocus: boolean = false;
  @Input() focusColor: string = '#e4d8ff';
  @Output() rowEmitter = new EventEmitter();

  // @ getting table element reference
  @ViewChild('table') table!: ElementRef;

  isAllSelected:boolean=false;
  selectedRows: boolean[] = [];

  // @Data display
  public order: OrderInterface = {};
  public iconStyle: OrderInterface = {};

// @row selection
  public isSelected = false;

  public focusedRowIndex: number[] = [];
  public selectedRowValues: string[] = [];


  ngOnInit(){
    this.data.endPage=this.data.startPage+this.pageLimit;
    this.data.rightMax=this.pageLimit;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('tableData')) {
      this.data.totalPages = Math.ceil(this.tableData.length / this.rowsPerPage);
      this.onPageChange(this.data.startPage);
      this.onSort(this.headers[1], 'desc');
      this.selectedRows = this.data.currentData.map(() => false);
    }
  }
  // function to sort the values in ascending and descending order
  public onSort(value: string, orderType: string) {
    for (let k in this.headers) {
      const current = this.headers[k];
      // change the order and icon type only of the selected column
      if (current === value) {
        if (orderType == 'desc') {
          this.order[current] = 'asc';
          this.iconStyle[current] = "pi pi-sort-amount-up";

          //update the table data array with sorted data
          this.data.currentData = this.data.currentData.sort((a, b): number => {
            return a[value] > b[value] ? 1 : -1;
          })
        } else {
          this.order[value] = 'desc';
          this.iconStyle[value] = "pi pi-sort-amount-down";
          this.data.currentData = this.data.currentData.sort((a, b): number => {
            return a[value] < b[value] ? 1 : -1;
          })
        }
      }
      //default icon and order of the columns
      else {
        this.order[current] = "desc"
        this.iconStyle[current] = "pi pi-sort-alt"
      }
    }
  }
  // slices the original table data based on start and end index
  public onPageChange(start: number) {
    this.data.startPage = start
    this.generateRange();
    start = this.rowsPerPage * (start - 1);
    this.data.endPage = start + this.rowsPerPage;
    this.data.currentData = this.tableData.slice(start, this.data.endPage)
  }
  // calculates the pagination range
  private calculatePageRange() {
    this.data.leftMax = this.data.startPage - Math.floor(this.pageLimit / 2)
    this.data.rightMax = this.data.startPage + Math.floor(this.pageLimit / 2)
    if (this.data.leftMax < 1) {
      this.data.leftMax = 1;
      this.data.rightMax = this.pageLimit;
    }
    if (this.data.rightMax > this.data.totalPages) {
      this.data.rightMax = this.data.totalPages;
      this.data.leftMax = this.data.totalPages - (this.pageLimit - 1) < 1 ? 1 : this.data.totalPages - (this.pageLimit - 1);
    }
  }
  private generateRange() {
    this.calculatePageRange();
    this.data.pageRange = [];
    for (let i = this.data.leftMax; i <= this.data.rightMax; i++) {
      this.data.pageRange.push(i);
    }
  }
  //function to check for nested data and return the value
  public checkNested(data: NestedData, value: string): string | NestedData {
    if (typeof (data[value]) !== "object") {
      return data[value]
    } else {
      for (let k in this.nestedKey) {
        if (k === value) {
          const nk = this.nestedKey[k];
          return this.checkNested(data[value] as NestedData, nk);
        }
      }
    }
    return 'no data'
  }

public  onRowClick(val: string, index: number){
    if(!this.showCheckBox){
      this.showFocus(val,index);
    }
}
public  onRowChange(val: string, index: number){
    if(this.showCheckBox){
      this.showFocus(val, index)
    }
}
  // function to highlight and emit the value of selected row
  private showFocus(val: string, index: number) {
    if(this.selectedRowValues.includes(val)){
      const valId=this.selectedRowValues.indexOf(val);
      this.selectedRowValues.splice(valId,1);
    }else{
      this.selectedRowValues.push(val);
    }
    this.rowEmitter.emit(this.selectedRowValues)
    if (this.enableFocus) {
      this.focusedRowIndex.push(index);
    }
  }

  public  toggleRowSelection(event: Event, index?: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(index!=null){ this.selectedRows[index] = isChecked;
      this.isAllSelected = this.selectedRows.every(val => val);}
    else {
      this.isAllSelected = isChecked;
      this.selectedRows = this.selectedRows.map(() => isChecked);
      this.selectedRowValues=isChecked?[...this.data.currentData]:[]
      this.rowEmitter.emit(this.selectedRowValues)
    }
  }
}
