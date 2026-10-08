export function BookCover() {
  return (
    <div className="book-stage" aria-hidden="true">
      <div className="book">
        <div className="book-spine" />
        <div className="book-face">
          <span className="mono">ARNAV GOYAL</span>
          <span className="book-title">
            The story
            <br />
            so far<span>.</span>
          </span>
          <div className="book-orbit">
            <i />
            <i />
            <i />
          </div>
          <span className="book-bottom mono">
            ON CURIOSITY, FAILURE
            <br />& BECOMING.
          </span>
        </div>
      </div>
    </div>
  );
}
