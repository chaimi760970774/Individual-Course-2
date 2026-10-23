export function IntroView({ title, description, videoCount, onStart }) {
  return (
    <div className="intro">
      <div className="intro__card">
        <h1 className="intro__title">{title}</h1>
        <p className="intro__desc">{description}</p>
        <p className="intro__video-count">
          You will watch <strong>{videoCount}</strong> video clips in random order.
        </p>
        <button className="intro__btn" onClick={onStart}>
          Begin
        </button>
      </div>
    </div>
  );
}