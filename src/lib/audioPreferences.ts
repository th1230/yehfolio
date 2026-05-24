export const DEFAULT_AUDIO_VOLUME = 0.15;

const AUDIO_PREFERENCES_KEY = 'yehfolio:audio-preferences';

export interface AudioPreferences {
  volume: number;
  shouldPlay: boolean;
}

export function clampAudioVolume(volume: number) {
  if (Number.isNaN(volume)) {
    return DEFAULT_AUDIO_VOLUME;
  }

  return Math.min(1, Math.max(0, volume));
}

export function readAudioPreferences(): AudioPreferences {
  if (typeof window === 'undefined') {
    return {
      volume: DEFAULT_AUDIO_VOLUME,
      shouldPlay: true,
    };
  }

  const rawValue = window.localStorage.getItem(AUDIO_PREFERENCES_KEY);

  if (!rawValue) {
    return {
      volume: DEFAULT_AUDIO_VOLUME,
      shouldPlay: true,
    };
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<AudioPreferences>;

    return {
      volume: clampAudioVolume(
        typeof parsedValue.volume === 'number' ? parsedValue.volume : DEFAULT_AUDIO_VOLUME
      ),
      shouldPlay: parsedValue.shouldPlay !== false,
    };
  } catch {
    return {
      volume: DEFAULT_AUDIO_VOLUME,
      shouldPlay: true,
    };
  }
}

export function writeAudioPreferences(preferences: AudioPreferences) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    AUDIO_PREFERENCES_KEY,
    JSON.stringify({
      volume: clampAudioVolume(preferences.volume),
      shouldPlay: preferences.shouldPlay,
    })
  );
}
