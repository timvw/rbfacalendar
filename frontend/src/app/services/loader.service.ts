import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, distinctUntilChanged, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new BehaviorSubject(false);
  public isLoading!: Observable<boolean>;

  constructor() {
   this.isLoading = this.loadingSubject.asObservable().pipe(delay(0), distinctUntilChanged());
  }

  updateIsLoading(value: boolean) {
    this.loadingSubject.next(value);
  }
}
