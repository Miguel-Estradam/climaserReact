import React from "react";


const Pagination = ({
  size,
  gutter,
  variant,
  bg,
  circle,
  activePag,
  limit,
  onChangePagination,
}) => {
  const item= [];
  let end = limit > 7 ? 7 : limit;

  if (activePag.current > 3 && activePag.current < limit - 3) {
    end = activePag.current + 4;
  }

  if (activePag.current > 3 && activePag.current >= limit - 3) {
    end = limit;
  }

  let start = 0;

  if (activePag.current > 3 && limit > 7) {
    start = activePag.current - 3;
  }

  for (let i = start; i < end; i++) {
    item.push(
      <button
        key={i}
        className={`px-2 py-1 rounded ${
          i === activePag.current
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        } ${i !== activePag.current && "hover:bg-blue-200"}`}
        onClick={() => onChangePagination(i)}
      >
        {i + 1}
      </button>
    );
  }

  if (limit <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-end ">
      <ul className={`flex mt-4 ${gutter ? "gap-x-2" : ""} ${variant}`}>
        <li className="page-indicator">
          <button
            className="px-2 py-1 rounded"
            onClick={() => {
              onChangePagination(0);
            }}
          >
            <i className="fa fa-angle-double-left" />
          </button>
        </li>
        <li className="page-indicator">
          <button
            className="px-2 py-1 rounded"
            onClick={() => {
              if (activePag.current > 0)
                onChangePagination(activePag.current - 1);
            }}
          >
            <i className="fa fa-angle-left" />
          </button>
        </li>
        {activePag.current >= 4 && limit > 8 ? (
          <li className="page-indicator flex items-center">
            <i className="fa fa-ellipsis-h" style={{ color: "#D03241" }} />
          </li>
        ) : null}
        {item}
        {limit > 8 && limit - 4 > activePag.current && (
          <li className="page-indicator flex items-center">
            <i className="fa fa-ellipsis-h" style={{ color: "#D03241" }} />
          </li>
        )}
        <li className="page-indicator">
          <button
            className="px-2 py-1 rounded"
            onClick={() => {
              if (activePag.current + 1 < limit)
                onChangePagination(activePag.current + 1);
            }}
          >
            <i className="fa fa-angle-right" />
          </button>
        </li>
        <li className="page-indicator">
          <button
            className="px-2 py-1 rounded"
            onClick={() => {
              onChangePagination(limit - 1);
            }}
          >
            <i className="fa fa-angle-double-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  bg: false,
  circle: false,
};

export default Pagination;
