import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',loadComponent: () => import('./components/list/list.component').then(comp => comp.ListComponent)
    },
    {
        path:'details/:id',loadComponent: () => import('./components/details/details.component').then(comp => comp.DetailsComponent)
    }
];
