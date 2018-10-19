import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemComponent } from './sistem.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecodsPageComponent } from './recods-page/recods-page.component';
import { HistoryDatailComponent } from './history-page/history-datail/history-datail.component';
import { AuthGuard } from '../sheard/services/auth.guard';

const routes: Routes = [
    {
        path: '', component: SistemComponent,canActivate:[AuthGuard], children: [
            { path: 'bill', component: BillPageComponent },

            { path: 'history', component: HistoryPageComponent },

            { path: 'planning', component: PlanningPageComponent },

            { path: 'records', component: RecodsPageComponent },

            {path:'history/:id',component: HistoryDatailComponent}

        ]
    },
    // { path: 'path', component: FeatureComponent },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemRoutingModule { }
