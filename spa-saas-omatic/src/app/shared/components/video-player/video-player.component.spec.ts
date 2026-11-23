import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';
import { I18nService } from '../../../core/services/i18n.service';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerComponent],
      providers: [I18nService],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPlayerComponent);
    fixture.componentRef.setInput('src', '/videos/saas-omatic-intro.mp4');
    fixture.componentRef.setInput('title', 'guide.video.title');
    fixture.componentRef.setInput('badge', 'guide.video.tag');
    fixture.componentRef.setInput('caption', 'guide.video.caption');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the video player component', () => {
    expect(component).toBeTruthy();
    expect(component.isPlaying()).toBe(false);
    expect(component.isMuted()).toBe(false);
    expect(component.currentTime()).toBe(0);
  });

  it('should toggle mute state when toggleMute is called', () => {
    expect(component.isMuted()).toBe(false);
    component.toggleMute();
    expect(component.isMuted()).toBe(true);
    component.toggleMute();
    expect(component.isMuted()).toBe(false);
  });

  it('should update duration on loadedmetadata', () => {
    const video = component.videoRef?.nativeElement;
    if (video) {
      Object.defineProperty(video, 'duration', { value: 60, configurable: true });
    }
    component.onLoadedMetadata();
    expect(component.duration()).toBe(60);
    expect(component.timeDisplay()).toContain('01:00');
  });

  it('should update currentTime and calculate progressPercent correctly', () => {
    component.duration.set(100);
    const video = component.videoRef?.nativeElement;
    if (video) {
      Object.defineProperty(video, 'currentTime', { value: 45, configurable: true });
    }
    component.onTimeUpdate();
    expect(component.currentTime()).toBe(45);
    expect(component.progressPercent()).toBe(45);
  });

  it('should reset isPlaying and currentTime when video ends', () => {
    component.isPlaying.set(true);
    component.currentTime.set(30);
    component.onVideoEnded();
    expect(component.isPlaying()).toBe(false);
    expect(component.currentTime()).toBe(0);
  });

  it('should respond to keyboard shortcuts (Space, m, f)', () => {
    const togglePlaySpy = vi.spyOn(component, 'togglePlay');
    const toggleMuteSpy = vi.spyOn(component, 'toggleMute');
    const toggleFsSpy = vi.spyOn(component, 'toggleFullscreen');

    component.onContainerKeyDown(new KeyboardEvent('keydown', { key: ' ' }));
    expect(togglePlaySpy).toHaveBeenCalled();

    component.onContainerKeyDown(new KeyboardEvent('keydown', { key: 'm' }));
    expect(toggleMuteSpy).toHaveBeenCalled();

    component.onContainerKeyDown(new KeyboardEvent('keydown', { key: 'f' }));
    expect(toggleFsSpy).toHaveBeenCalled();
  });
});
