import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.scss']
})
export class SessionTimerComponent implements OnInit, OnDestroy {
  remainingTime: string = '00:00';
  private timer: any;
  private sessionEndTime: number = 0;

  constructor() { }

  ngOnInit(): void {
    const sessionEndTimeStr = sessionStorage.getItem('sessionEndTime');
    if (sessionEndTimeStr) {
      this.sessionEndTime = parseInt(sessionEndTimeStr, 10);
    }
    this.updateTime();
    this.timer = setInterval(() => this.updateTime(), 1000); // Cập nhật mỗi giây
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateTime(): void {
    const remaining = Math.max(0, this.sessionEndTime - Date.now());
    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    this.remainingTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
