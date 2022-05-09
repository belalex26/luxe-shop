import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

import {renderPrice, renderTypeText} from "../../utils";
import {updateToCard, selectCard} from "../../store/cardSlise";
import {dataObject} from "../../store/objectSlise";

function BasketItem({...props}) {
  const {basketItem, count, onRemoveModal} = props;

  const dispatch = useDispatch();
  const cart = useSelector(selectCard);

  let [countItem, setCountItem] = useState(count);
  let [totalPrice, setTotalPrice] = useState(0);
  let tempCount = {
    ...cart,
    [basketItem[`articul`]]: countItem,
  };

  let totalPriceItem = Number(basketItem[`price`] * countItem);

  useEffect(() => {
    setTotalPrice(totalPriceItem);
  }, [totalPriceItem]);

  useEffect(() => {
    dispatch(updateToCard(tempCount));
  }, [countItem]);

  const onClickRemoveModal = (evt) => {
    let target = evt.target;
    let objArticul = target.getAttribute(`data-key`);
    let temp = {
      id: objArticul
    };
    dispatch(dataObject(temp));
    onRemoveModal(true);
  };

  const onPrevButtonClick = () => {
    let newCount = countItem - 1;
    setCountItem(newCount);

    if (countItem === 1) {
      setCountItem(1);
      onRemoveModal(true);
    }
  };

  const onNextButtonClick = () => {
    let newCount = countItem + 1;
    setCountItem(newCount);
  };

  return (
    <>
      <li className="basket__item">
        <img className="basket__item-img" src={basketItem[`image`]} alt="фото товара" width="48" height="124"></img>
        <div className="basket__item-info">
          <h3 className="basket__item-title">{basketItem[`name`]}</h3>
          <p className="basket__item-article-number">Артикул: {basketItem[`articul`]} </p>
          <p className="basket__item-guitar-type">{renderTypeText(basketItem[`type`])}</p>
        </div>
        <p className="basket__item-guitar-price">{renderPrice(basketItem[`price`])} ₽</p>
        <div className="basket__item-btns">
          <button className="basket__item-btn basket__item-btn--prev" onClick={onPrevButtonClick} type="button"></button>
          <input className="basket__item-count" type="number" value={countItem} onChange={(evt) => setCountItem(evt.target.value)}/>
          <button className="basket__item-btn basket__item-btn--next" type="button" onClick={onNextButtonClick}></button>
        </div>
        <p className="basket__item-price-total">{renderPrice(totalPrice)} ₽</p>
        <button className="basket__item-remove" type="button" aria-label="удалить товар" data-key={basketItem[`articul`]} onClick={onClickRemoveModal}></button>
      </li>
    </>

  );
}

BasketItem.propTypes = {
  basketItem: PropTypes.object,
  count: PropTypes.number,
  onRemoveModal: PropTypes.func,
};

export default BasketItem;
