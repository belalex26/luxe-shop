import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";

import {changeSort} from "../../store/filterSlise";
import {DIRECTION_DOWN, DIRECTION_UP, SORT_BY_REVIEW, SORT_BY_PRICE} from "../../utils";


function SortPanel() {
  const dispatch = useDispatch();

  const [direction, setDirection] = useState(``);
  const [typeSort, setTypeSort] = useState(``);

  useEffect(() => {
    getObjSort();
  }, [direction, typeSort]);

  const getObjSort = () => {
    let sortsType = {
      type: typeSort,
      direction
    };

    dispatch(changeSort(sortsType));
  };

  return (
    <>
      <p className="sort-panel__title">Сортировать:</p>
      <div className="sort-panel__content">

        <div className="sort-panel__type">
          <label className="sort-panel__type-label sort-panel__type-label--price">
            <input className="sort-panel__type-radio" type="radio" name="sortType" onChange={() => setTypeSort(SORT_BY_PRICE)}/>
            <span className="sort-panel__type-text">по цене</span>
          </label>

          <label className="sort-panel__type-label sort-panel__type-label--reviews">
            <input className="sort-panel__type-radio" type="radio" name="sortType" onChange={() => setTypeSort(SORT_BY_REVIEW)}/>
            <span className="sort-panel__type-text">по популярности</span>
          </label>
        </div>

        <div className="sort-panel__direction">

          <label className="sort-panel__direction-label">
            <input className="sort-panel__direction-radio" type="radio" name="direction" onChange={() => setDirection(DIRECTION_UP)}/>
            <span className="sort-panel__direction-icon" aria-label="по возрастанию" role="radio"></span>
          </label>

          <label className="sort-panel__direction-label">
            <input className="sort-panel__direction-radio" type="radio" name="direction" onChange={() => setDirection(DIRECTION_DOWN)}/>
            <span className="sort-panel__direction-icon sort-panel__direction-icon--down" aria-label="по убыванию" role="radio"></span>
          </label>

        </div>
      </div>
    </>
  );
}

export default SortPanel;
