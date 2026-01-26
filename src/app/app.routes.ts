import { Routes } from '@angular/router';
import { Automatic } from './automatic/automatic';
import { Manual } from './manual/manual';

export const routes: Routes = [
	{ path: '', redirectTo: 'automatic', pathMatch: 'full' },
	{ path: 'automatic', component: Automatic },
	{ path: 'manual', component: Manual },
];
