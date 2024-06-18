import {Component, inject} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {TableComponent} from "./resuable/table/table.component";
import {DataService} from "./services/data.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CustomTable';
  tableData:any[]=[]
  tableHeader:string[]=[]
  private dataService:DataService=inject(DataService)
  obj={
    'company':'name',
    'address':'street'
  }

  ngOnInit(){
this.dataService.getData().subscribe({
  next:(res:any)=>{this.tableData=res
    this.tableHeader=Object.keys(this.tableData[0])
    console.log(res)}
})
  }
public  outputReceiver(e:Event){
  console.log(e)
}
}


