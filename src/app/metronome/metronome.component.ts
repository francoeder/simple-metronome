import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';

export enum Toggle {
  On,
  Off,
}

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit, OnDestroy {

  private tick: any;
  private minuteInMiliseconds = 60000;
  private interval: number;
  private metronomeAgent: Subscription;
  private verifyFocusAgent: Subscription;

  public beatsPerMinute = 90;
  public status = Toggle.Off;

  constructor() { }

  ngOnInit(): void {
    this.tick = new Audio();
    this.tick.src = './../../../assets/sounds/tick.mp3';
    this.tick.load();
    this.setInterval();
    this.startVerifyFocusAgent();
  }

  ngOnDestroy(): void {
    this.metronomeAgent.unsubscribe();
    this.verifyFocusAgent.unsubscribe();
  }

  private setInterval() {
    this.interval = this.minuteInMiliseconds / this.beatsPerMinute;
  }

  updateInterval() {
    this.setInterval();

    if (this.status === Toggle.On) {
      // Reset metronome with new BPM
      this.stop();
      this.start();
    }
  }

  start(): void {
    this.status = Toggle.On;
    this.metronomeAgent = timer(0, this.interval).subscribe(() => this.playTick());
  }

  stop(): void {
    this.status = Toggle.Off;
    this.metronomeAgent.unsubscribe();
  }

  private playTick() {
    this.tick.play();
  }

  private startVerifyFocusAgent() {
    this.verifyFocusAgent = timer(0, 100).subscribe(() => {
      if (!document.hasFocus() && this.status === Toggle.On) {
        this.stop();
      }
    });
  }
}
