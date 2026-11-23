import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '../../pipes/translate.pipe';

function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const paddedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const paddedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  return `${paddedMins}:${paddedSecs}`;
}

@Component({
  selector: 'app-video-player',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
  readonly src = input.required<string>();
  readonly poster = input<string>('');
  readonly title = input<string>('');
  readonly badge = input<string>('');
  readonly caption = input<string>('');

  @ViewChild('videoRef') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('playerContainer') playerContainer?: ElementRef<HTMLElement>;

  readonly isPlaying = signal<boolean>(false);
  readonly isMuted = signal<boolean>(false);
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(0);
  readonly isFullscreen = signal<boolean>(false);
  readonly controlsVisible = signal<boolean>(true);

  readonly progressPercent = computed(() => {
    const total = this.duration();
    const current = this.currentTime();
    if (total <= 0) return 0;
    return Math.min(100, Math.max(0, (current / total) * 100));
  });

  readonly timeDisplay = computed(() => {
    return `${formatDuration(this.currentTime())} / ${formatDuration(this.duration())}`;
  });

  togglePlay(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    if (video.paused || video.ended) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
      this.isPlaying.set(true);
    } else {
      video.pause();
      this.isPlaying.set(false);
    }
  }

  toggleMute(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    video.muted = !video.muted;
    this.isMuted.set(video.muted);
  }

  toggleFullscreen(): void {
    const container = this.playerContainer?.nativeElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => this.isFullscreen.set(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => this.isFullscreen.set(false)).catch(() => {});
    }
  }

  onTimeUpdate(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;
    this.currentTime.set(video.currentTime);
  }

  onLoadedMetadata(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;
    this.duration.set(video.duration);
  }

  onVideoEnded(): void {
    this.isPlaying.set(false);
    this.currentTime.set(0);
  }

  onSeek(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const targetPercent = Number(inputEl.value);
    const video = this.videoRef?.nativeElement;
    if (!video || isNaN(targetPercent)) return;

    const newTime = (targetPercent / 100) * this.duration();
    video.currentTime = newTime;
    this.currentTime.set(newTime);
  }

  onContainerKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'k') {
      event.preventDefault();
      this.togglePlay();
    } else if (event.key === 'm') {
      event.preventDefault();
      this.toggleMute();
    } else if (event.key === 'f') {
      event.preventDefault();
      this.toggleFullscreen();
    }
  }
}
