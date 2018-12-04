import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
node: Subject<Node> = new BehaviorSubject<Node>(node);
  constructor() {

  }
}
