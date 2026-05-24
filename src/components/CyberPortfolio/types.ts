export type BrowserAudioContext = AudioContext & {
  createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode;
};
