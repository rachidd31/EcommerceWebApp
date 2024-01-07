// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private showSideBarSource = new Subject<void>();
  showSideBar$ = this.showSideBarSource.asObservable();

  triggerShowSideBar() {
    this.showSideBarSource.next();
  }
}
