import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { StarterComponent } from './../starter/starter.component';
import { MapsComponent } from './../maps/maps.component'
import { AccountsComponent } from './../accounts/accounts.component'
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'maps', pathMatch: 'full' },
      { path: 'overview', redirectTo: 'maps', pathMatch: 'full' },
      { path: 'accounts', redirectTo: 'accounts', pathMatch: 'full' },
      { path: 'maps', component: MapsComponent },
      { path: 'accounts', component: AccountsComponent },
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
