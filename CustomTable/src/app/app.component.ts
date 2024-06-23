import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {TableComponent} from "./resuable/table/table.component";
import {DataService} from "./services/data.service";
import {TableActionsComponent} from "./resuable/table-actions/table-actions.component";
import {TableLoaderComponent} from "./Preloader/table-loader/table-loader.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, TableActionsComponent, TableLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title = 'CustomTable';
  tableData:any[]=[]
  tableHeader:string[]=[]
  private dataService:DataService=inject(DataService)
  obj={
    'company':'name',
    'address':'street'
  }
isLoading:boolean=false;
  ngOnInit(){
    this.isLoading=true;
this.dataService.getData().subscribe({

  next:(res:any)=>{this.tableData=res
    this.tableHeader=Object.keys(this.tableData[0])
    console.log(this.tableHeader)
    setTimeout(()=>{
      this.isLoading=false
    },1500)
 }
})
  }
public  outputReceiver(e:Event){
  console.log(e)
}
}


