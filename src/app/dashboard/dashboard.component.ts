import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataType } from './DataType';
import { RestApiService } from '../shared/rest-api.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading : boolean = true;
  tableLoading: boolean = false;
  // allUser: DataType[] = [];
  allUser: any[] = [];
  page: number = 1;
  constructor(private service: RestApiService) { }
  displayedColumns: string[] = ['id', 'original_language', 'original_title', 'overview'];
  
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.tableLoading = true;
    }, 5000);
    this.tableLoading = false;
    this.loading = true;
    this.AllUserDetails();
  }

  AllUserDetails() {
    this.service.getmovieDetails().subscribe((res) => {
      this.allUser = res.results;
    });
  }
  onScroll() {
    this.page = this.page + 1;
    this.AllUserDetails();
  }
}

