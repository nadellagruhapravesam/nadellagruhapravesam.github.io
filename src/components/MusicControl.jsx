export default function MusicControl({ isMuted, isPlaying, onToggleMusic }) {
  const musicActive = isPlaying && !isMuted

  return (
    <button
      type="button"
      className={`music-control ${musicActive ? 'is-playing' : 'is-muted'}`}
      onClick={onToggleMusic}
      aria-label={musicActive ? 'Pause background music' : 'Play background music'}
      aria-pressed={musicActive}
      title={musicActive ? 'Pause music' : 'Play music'}
    >
      <span className="music-disc" aria-hidden="true">
        <i />
      </span>
      <span className="music-label">{musicActive ? 'Music on' : 'Music off'}</span>
    </button>
  )
}