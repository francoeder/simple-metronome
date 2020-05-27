import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

export enum Toggle {
  On,
  Off,
}

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit {

  beatsPerMinute = 90;
  status = Toggle.Off;

  constructor() { }

  ngOnInit(): void {

    this.setup();

  }

  setup(): void {
    var loop = new Tone.Loop(function(time){
      var player = new Tone.Player("./../../assets/sounds/tick.mp3").toMaster();
      player.autostart = true;
    }, "4n").start(0);

    this.setBpm();
  }

  start(): void {
    Tone.Transport.start();
  }

  stop(): void {
    Tone.Transport.stop();
  }

  setBpm(): void {
    Tone.Transport.bpm.value = this.beatsPerMinute;
  }

  updateBpm(): void {
    this.setBpm();
    this.stop();
    this.start();
  }
}
