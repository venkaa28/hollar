import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnInit {
  @Input() name: string;
  @Input() email: string;
  @Input() phoneNumber: string;
  // @Input() company: string;
  // @Input() job: string;
  // Add more inputs

  constructor() { }

  ngOnInit() {}

}
