import { Injectable } from "@angular/core";
import { Title } from '@angular/platform-browser'
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class PayrollTitleStrategy extends TitleStrategy {
    constructor(private readonly title: Title){
        super();
    }

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const routeTitle = this.buildTitle(snapshot); 
        this.title.setTitle(routeTitle ?? 'Payroll Processing System');
    }

    override buildTitle(snapshot: RouterStateSnapshot): string | undefined { 
        let route: ActivatedRouteSnapshot = snapshot.root;

        while (route.firstChild) { 
            route = route.firstChild; 
        }

        return route.title;
    }
}