import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, interval, map } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css',
})
export class ClockComponent implements OnInit, OnDestroy {
  currentDate: string = '';
  currentTime: string = '';
  private clockSubscrption!: Subscription;

  ngOnInit(): void {
    const clock: Observable<Date> = interval(1000).pipe(map(() => new Date()));

    this.clockSubscrption = clock.subscribe((time) => {
      this.currentDate = time.toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
      });
      this.currentTime = time.toLocaleTimeString();
    });
  }

  ngOnDestroy(): void {
    if (this.clockSubscrption) {
      this.clockSubscrption.unsubscribe();
    }
  }
}
