let context: AudioContext | undefined;
export function chime(muted: boolean, kind: 'step' | 'good' | 'battle' = 'good') {
  if (muted) return;
  try {
    context ??= new AudioContext();
    if (context.state === 'suspended') void context.resume();
    const start = context.currentTime;
    const notes =
      kind === 'good' ? [392, 523.25, 659.25] : kind === 'battle' ? [196, 246.94] : [220];
    notes.forEach((frequency, i) => {
      const oscillator = context!.createOscillator(),
        gain = context!.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.035, start + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, start + i * 0.09 + 0.14);
      oscillator.connect(gain);
      gain.connect(context!.destination);
      oscillator.start(start + i * 0.09);
      oscillator.stop(start + i * 0.09 + 0.15);
    });
  } catch {
    /* Audio is optional when a browser has no audio output. */
  }
}
