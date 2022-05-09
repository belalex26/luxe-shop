import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {selectObject} from "../../store/objectSlise";
import {selectDress} from "../../store/dressSlise";
import {addToCart} from "../../store/cardSlise";

import {renderPrice, renderTypeText} from "../../utils";

const AddContent = ({...props}) => {
  const {onModalAddActive, successModal, onSuccessModal} = props;

  const dressId = useSelector(selectObject);
  const dress = useSelector(selectDress);
  const dispatch = useDispatch();
  let itemDress = dress.find((index) => index.articul === dressId.id);

  useEffect(() => {
    renderAddContent();
  }, [itemDress]);

  const onClickAddToBasket = (evt) => {
    let target = evt.target;
    let objArticul = target.getAttribute(`data-key`);
    dispatch(addToCart(objArticul));
    onSuccessModal(true);
  };

  // eslint-disable-next-line consistent-return
  const renderAddContent = () => {
    if (itemDress !== undefined) {
      if (!successModal) {
        return (
          <>
            <p className="add-content__title">Добавить товар в корзину</p>
            <div className="add-content__info">
              <img className="add-content__img" src={itemDress.image} alt="фото товара" />
              <div className="add-content__info-date">
                <p className="add-content__info-name">{itemDress.name}</p>
                <p className="add-content__info-article">Артикул: {itemDress.articul} </p>
                <p className="add-content__info-type"> {renderTypeText(itemDress.type)}</p>
                <p className="add-content__info-price">Цена: {renderPrice(itemDress.price)} ₽</p>
              </div>
              <button className="add-content__btn" type="button" data-key={itemDress.articul} onClick={onClickAddToBasket}>Добавить в корзину</button>
            </div>
          </>
        );
      }
      return (
        <>
          <p className="add-content__title">Товар успешно добавлен в корзину</p>
          <div className="add-content__success-wrap">
            <Link className="add-content__success-link add-content__success-link--basket" to="/basket">Перейти в корзину</Link>
            <button className="add-content__success-link add-content__success-link--main" type="button" onClick={() => onModalAddActive(false)}>Продолжить покупки</button>
          </div>
        </>
      );
    }
  };

  let item = renderAddContent();

  return (
    <>
      <h2 className="visually-hidden">Подтверждение</h2>
      {item}
    </>
  );
};

AddContent.propTypes = {
  onModalAddActive: PropTypes.func,
  modalActive: PropTypes.bool,
  successModal: PropTypes.bool,
  onSuccessModal: PropTypes.func,
};

export default AddContent;
