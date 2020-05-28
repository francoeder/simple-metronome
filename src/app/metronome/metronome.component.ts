import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import StartAudioContext from 'startaudiocontext';

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

  beatsPerMinute = 220;
  status = Toggle.Off;

  constructor() { }

  ngOnInit(): void {

    this.setup();

  }

  setup(): void {
    StartAudioContext(Tone.context, document.documentElement);
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }

    this.setBpm();

    const tickSynth = this.buildTick();

    Tone.Transport.scheduleRepeat((time) => {
      tickSynth.triggerAttackRelease("B5", "16n", time);
    }, '4n');
  }

  buildTick(): any {
    const tickSynth =  new Tone.Synth().toMaster();
    tickSynth.oscillator.type = 'sine';
    tickSynth.envelope.attack = 0;
    tickSynth.envelope.decay = 0.05;
    tickSynth.envelope.sustain = 0;
    tickSynth.envelope.release = 0.001;

    tickSynth.toMaster();

    return tickSynth;
  }

  start(): void {
    Tone.Transport.start();
  }

  stop(): void {
    Tone.Transport.stop();
    Tone.Transport.position = 0;
  }

  addBpm(value: number): void {
    this.beatsPerMinute += value;
    this.setBpm();
  }

  setBpm(): void {
    Tone.Transport.bpm.value = this.beatsPerMinute;
    this.buildTick();
  }

  updateBpm(): void {
    this.setBpm();
    this.stop();
    this.start();
  }
}
