import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorserviceService {

  private errorSubject = new BehaviorSubject<string | null>(null);

  constructor() { }

  handleError(errorMessage: string): void {
    this.errorSubject.next(errorMessage);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  getError(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }
}
