interface InfoProps {
  title: string;
  releaseDate: string;
  overview: string;
  rating: number;
  onClose: () => void;
}

function Info({ title, releaseDate, overview, rating, onClose }: InfoProps) {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <>
      <div className="d-flex flex-column position-absolute p-3 gap-2 overflow-y-auto info-container">
        <h4>{title}</h4>
        <h6 className="d-flex align-items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="rgb(210, 0, 0)"
            className="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
          {releaseDate}
        </h6>

        <h6 className="d-flex gap-2 align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="orange"
            className="bi bi-star-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
          {rating.toFixed(1)}
        </h6>
        <p>
          <small>{overview}</small>
        </p>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleButtonClick}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default Info;
