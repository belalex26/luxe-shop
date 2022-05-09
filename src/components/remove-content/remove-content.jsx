import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PropTypes from 'prop-types';

import {renderPrice} from "../../utils";
import {selectObject} from "../../store/objectSlise";
import {selectDress} from "../../store/dressSlise";
import {deleteToCard, selectCard} from "../../store/cardSlise";

const RemoveContent = ({...props}) => {
  const {onModalActive} = props;
  const dressId = useSelector(selectObject);
  const dress = useSelector(selectDress);
  const cart = useSelector(selectCard);
  let temp = {
    ...cart
  };

  const dispatch = useDispatch();

  let itemDress = dress.find((index) => index.articul === dressId.id);

  useEffect(() => {
    renderAddContent();
  }, [itemDress]);

  const onRemoveItemClick = () => {
    delete temp[itemDress.articul];
    dispatch(deleteToCard(temp));
    onModalActive(false);
  };

  // eslint-disable-next-line consistent-return
  const renderAddContent = () => {
    if (itemDress !== undefined) {
      return (
        <>
          <img className="remove-content__img" src={itemDress.image} alt="фото товара" />
          <div className="remove-content__info-date">
            <p className="remove-content__info-name">{itemDress.name}</p>
            <p className="remove-content__info-article">Артикул: {itemDress.articul}</p>
            <p className="remove-content__info-type">{itemDress.type} </p>
            <p className="remove-content__info-price">Цена: {renderPrice(itemDress.price)} ₽</p>
          </div>
        </>
      );
    }
  };

  let item = renderAddContent();

  return (
    <div className="remove-content">
      <h2 className="visually-hidden">Подтверждение</h2>
      <p className="remove-content__title">Удалить этот товар?</p>
      <div className="remove-content__info">
        {item}
        <div className="remove-content__control">
          <button className="remove-content__btn remove-content__btn--remove" type="button" onClick={onRemoveItemClick}>Удалить товар</button>
          <button className="remove-content__btn remove-content__btn--close" type="button" onClick={() => onModalActive(false)}>Продолжить покупки</button>
        </div>
      </div>
    </div>
  );

};

RemoveContent.propTypes = {
  onModalActive: PropTypes.func,
};


export default RemoveContent;
