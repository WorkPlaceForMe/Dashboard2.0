import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { FacesService } from '../../../services/faces.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

    @HostBinding('class') classes ='row';
    users: any = [];
    images: any = [];
  relations: any;
    constructor(private facesService: FacesService,private router: Router) { }
        
    ngOnInit() {
      this.getUsers();
    }

    stat:string = 'success'
    
    settings = {
      mode: 'external',
      actions: {
        position: 'right',
        //custom: [{ name: 'routeToAPage', title: `<img src="/icon.png">` }]
        columnTitle: 'Delete',
        add: false,
        edit: false,
        delete: false,
      //   custom: [
      //   { name: 'viewrecord', title: '<button nbButton [status]="stat">aaaa<button>'},
      // ],
      },
      pager : {
        display : true,
        perPage:5
        },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmCreate: true,
        },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      noDataMessage: "No media found, you can add a new video with the 'add' buttom",
      columns: {
        name: {
          title: 'Name',
          type: 'string',
          filter: false
        },
        age_group: {
          title: 'Branch',
          type: 'string',
          filter: false
        },
        role: {
          title: 'Details',
          type: 'custom',
          filter: false,
          renderComponent: ButtonViewComponent,
          onComponentInitFunction(instance) {
            instance.save.subscribe(row => {
              alert(`${row.name} saved!`)
            });
          }
        },
        category: {
          title: 'Analytics',
          type: 'string',
          filter: false
        },
      },
    };
    
    check(){
      this.show = false;
      if(this.searchStr != ''){
        this.search(this.searchStr)
      }
    }
  
    search(query: string){
      if(this.searchWr == ''){
        return this.show = true;
      }else{
        this.show = false;
      }
      this.source = this.source1.filter(data => data[this.searchWr].includes(query))
      if(query == ''){
        this.source = this.source1;
      }
    }

    source:any = new LocalDataSource();
    source1:any = new LocalDataSource();
    searchStr:string = ''
    searchFields = [
    {
      value: 'name',
      show: 'Name'
    },
    {
      value: 'branch',
      show: 'Branch'
    }
  ];
    searchWr:string = '';
    show:boolean = false;

    hola2():void{
      this.router.navigateByUrl('/pages/user/add')
    }

    hola1(event): void{
      console.log(event)
      this.router.navigateByUrl('/pages/user/edit/' + event.data.uuid)
    }
    
    hola3(event): void{
      this.deleteUser(event.data.uuid)
    }

    // addSched(){
    //       this.facesService.getAllRelations().subscribe(
    //         res => {
    //           this.relations = res['data'];
    //           for(var a of this.relations){
    //             if(a.algo_id == 18){
    //                 this.settings.columns['sched'] =  {
    //                   title: 'Schedule',
    //                   type: 'custom',
    //                   filter: false,
    //                   renderComponent: Button1ViewComponent,
    //                   onComponentInitFunction(instance) {
    //                     instance.save.subscribe(row => {
    //                       alert(`${row.name} saved!`)
    //                     });
    //                   }
    //                 },
    //                 this.settings = Object.assign({}, this.settings);
    //             }
    //           }
    //         },
    //         err => console.error(err)
    //       );
    // }

    // onDeleteConfirm(event): void {
    //   if (window.confirm('Are you sure you want to delete?')) {
    //     event.confirm.resolve();
    //   } else {
    //     event.confirm.reject();
    //   }
    // }

  getUsers(){
    // this.facesService.getUsers().subscribe(
    //   res => {
    //     this.source = res['data'];
    //     this.source1 = this.source
    //   },
    //   err => console.error(err)
    // );
  }

    deleteUser(id: string){
      for(var a in this.users){
        if(id == this.users[a].uuid){
          var n = this.users[a].name;
        }
      }
      if(confirm("Do you want to delete "+ n +"'s Facial Recognition user?")){
      this.facesService.deleteUser(id).subscribe(
        res =>{
          console.log(res);
          this.getUsers();
        },
        err => console.log(err)
      )
    }
  }
}

@Component({
  selector: 'button-view',
  template: `
<div class='row'>
    <div class='col-md-6'>
      <button class='btn btn-primary btn-block' (click)='onClick()'><i class="fas fa-play"></i></button>
    </div>
    <div class='col-md-6'>
      <button class='btn btn-primary btn-block' (click)='onClick()'><i class="fas fa-clipboard-list"></i></button>
    </div>
</div>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  constructor(private router: Router){
  }

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.router.navigateByUrl('/pages/user/images/' + this.rowData.uuid)
  }
}