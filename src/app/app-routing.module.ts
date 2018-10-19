import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules,  } from '@angular/router';
import { NotFoundComponent } from './sheard/components/not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'sistem', loadChildren: './sistem/sistem.module#SistemModule' },
    // { path: 'path', component: FeatureComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

