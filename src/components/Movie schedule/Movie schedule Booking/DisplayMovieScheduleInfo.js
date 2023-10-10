import React from "react";

const DisplayMovieScheduleInfo = ({ preview, formInfo, onSetFormInfo }) => {
  const deleteShowTimeHandler = (date) => {
    const newList = formInfo.show_time?.filter((el) => el !== date);
    onSetFormInfo((prev) => {
      return {
        ...prev,
        show_time: newList,
      };
    });
  };
  return (
    <div>
      {(formInfo.show_time.length > 0 || preview.preview.length > 0) && (
        <>
          <p className="MovieSchedulePreview">Image and show time preview</p>
          <div className="displayMoviescheduleContainer">
            <div>
              {preview.preview &&
                preview.preview?.map((pic, i) => {
                  return (
                    <img src={pic} alt="" className="previewImg" key={i} />
                  );
                })}
            </div>

            <ul className="displayUl">
              {formInfo.show_time &&
                formInfo.show_time?.map((el, i) => {
                  return (
                    <li className="displayList" key={i}>
                      {el}
                      <span
                        className="delete"
                        onClick={() => deleteShowTimeHandler(el)}
                      >
                        Delete
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayMovieScheduleInfo;
