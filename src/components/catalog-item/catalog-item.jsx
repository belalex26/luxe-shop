import React from "react";
import PropTypes from "prop-types";

import {dataObject} from "../../store/objectSlise";

import {renderPrice} from "../../utils";
import Ratings from "../ratings/ratings";
import {useDispatch} from "react-redux";


function CatalogItem({...props}) {
  const {item, onModalActive} = props;

  const dispatch = useDispatch();

  const onClickBuy = (evt) => {
    onModalActive(true);
    let target = evt.target;
    let objArticul = target.getAttribute(`data-key`);
    let temp = {
      id: objArticul
    };
    dispatch(dataObject(temp));
  };

  return (
    <>
      <li className="catalog__item">
        <div className="catalog__item-img">
          <img className="catalog__item-img-img" src={item.image} alt="фото товара" width="120" height="190"/>
        </div>
        <div className="catalog__item-rate">
          <Ratings rating={item.rating}/>
          <p className="catalog__item-rate-text">{item.reviews}</p>
        </div>
        <div className="catalog__item-info">
          <p className="catalog__item-title">{item.name}</p>
          <p className="catalog__item-price">{renderPrice(item.price)} ₽</p>
        </div>
        <div className="catalog__item-btns">
          <a href="/id:" className="catalog__item-btn-more">Подробнее</a>
          <button className="catalog__item-btn-buy" type="button" data-key={item.articul} onClick={onClickBuy}>Купить</button>
        </div>
      </li>
    </>
  );
}

CatalogItem.propTypes = {
  item: PropTypes.object,
  onModalActive: PropTypes.func,
};

export default CatalogItem;
