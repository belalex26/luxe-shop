import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectDress} from "../../store/dressSlise";
import {selectCard} from "../../store/cardSlise";

import {GITARAHIT_SALE, SUPERGITARA_SALE, GITARA2020_SALE, GITARA2020_SALE_MAX, MAX_SALE, renderPrice} from "../../utils";
import Footer from "../footer/footer";
import Header from "../header/header";
import BasketItem from "../basket-item/basket-item";
import Modal from "../modal/modal";
import RemoveContent from "../remove-content/remove-content";


function Basket() {

  const NOT_SALE = 0;
  // const dispatch = useDispatch();
  const [totaPriceItem, setTotaPriceItem] = useState([]);
  const [promoCode, setPromoCode] = useState(``);
  const [sale, setSale] = useState(0);
  const [saleCheck, setSaleCheck] = useState(false);
  const [errorPromoCode, setErrorPromoCode] = useState(false);

  const [removeModal, setRemoveModal] = useState(false);
  const dress = useSelector(selectDress);
  const cart = useSelector(selectCard);
  const cards = Object.keys(cart);
  const counts = Object.values(cart);
  const INIT_PRICE = 0;

  let guitarObg = dress.reduce((acc, itemDress) => {
    acc[itemDress[`articul`]] = itemDress;
    return acc;
  }, {});

  // расчет итоговой цены

  let result = dress.filter((item) => cards.some((art) => item.articul.includes(art)));

  function multiply(a, b) {
    let c = [];
    for (let i = 0; i < a.length; i++) {
      c.push(a[i] * b[i].price);
    }
    return c;
  }

  const countPrice = () => {
    let totalPrice = INIT_PRICE;
    if (cards.length > 0) {
      let totalPriceItem = multiply(counts, result);
      totalPrice = totalPriceItem.reduce((sum, current) => sum + current);
    }
    return totalPrice;
  };

  let countsPrice = countPrice();

  // расчет скидки

  let saleCount = 0;

  const countsSale = () => {

    if (promoCode === `GITARAHIT`) {
      saleCount = countsPrice * GITARAHIT_SALE;
      setSale(saleCount);
    }

    if (promoCode === `SUPERGITARA`) {
      saleCount = SUPERGITARA_SALE;
      setSale(saleCount);
    }

    if (promoCode === `GITARA2020`) {
      if (countsPrice < MAX_SALE) {
        saleCount = countsPrice * GITARA2020_SALE;
      } else {
        saleCount = GITARA2020_SALE_MAX;
      }
      setSale(saleCount);
    }

    if (sale !== NOT_SALE && saleCheck) {
      setSale(sale);
    }
  };

  const onButtonPromoClick = () => {
    onValidCode();
    countsSale();
  };

  const onValidCode = () => {

    if (promoCode === `GITARAHIT` || promoCode === `SUPERGITARA` || promoCode === `GITARA2020`) {
      setErrorPromoCode(false);
      setSaleCheck(true);
    } else {
      setErrorPromoCode(true);
    }
  };

  const onChangePromoCode = (evt) => {
    setSaleCheck(false);
    let promoValue = evt.target.value;
    setPromoCode(promoValue.replace(/\s/g, ``));
  };

  const renderTotalPrice = () => {
    countsPrice = Number(countsPrice - sale);
    return (renderPrice(countsPrice));
  };

  return (
    <>
      <Header />
      <main className="basket">
        <div className="basket__container">
          <h1 className="basket__title">Корзина</h1>
          <ul className="basket__breadcrumps">
            <li className="basket__breadcrumps-item">
              <a className="basket__breadcrumps-link" href="#">Главная</a>
            </li>
            <li className="basket__breadcrumps-item">
              <Link className="basket__breadcrumps-link" to="/">Каталог</Link>
            </li>
            <li className="basket__breadcrumps-item basket__breadcrumps-item--last">
              <p className="basket__breadcrumps-text">Оформляем</p>
            </li>
          </ul>

          <ul className="basket__list">
            { cards.length === 0
              ?
              <p className="basket__list-text">Пока пусто</p>
              :
              Object.keys(cart).map((item) => <BasketItem key={item + guitarObg[item][`articule`]}
                basketItem={guitarObg[item]}
                count={cart[item]}
                onRemoveModal={setRemoveModal}
                totaPriceItem={totaPriceItem}
                onTotaPriceItem={setTotaPriceItem}
              />)
            }
          </ul>

          <div className="basket__promo">
            <p className="basket__promo-title">Промокод на скидку</p>
            <p className="basket__promo-text">Введите свой промокод, если он у вас есть.</p>
            <label className="basket__promo-label">
              <span className={errorPromoCode ? `basket__promo-error basket__promo-error--active` : `basket__promo-error`}>код не действителен</span>
              <input className="basket__promo-input" type="text" value={promoCode} onChange={onChangePromoCode} placeholder="Введите промокод" pattern="/[\s/g]"/>
            </label>
            <span className={saleCheck ? `basket__promo-check basket__promo-check--active` : `basket__promo-check`}>промокод применен</span>
            <button className="basket__promo-btn" onClick={onButtonPromoClick}>Применить купон</button>
          </div>
          <div className="basket__control">
            <p className="basket__control-total">Всего: {renderTotalPrice()} ₽</p>
            <a className="basket__control-submit" href="/success">Оформить заказ</a>
          </div>
        </div>
      </main>
      <Footer />
      <Modal modalActive={removeModal} onModalActive={setRemoveModal}>
        <RemoveContent onModalActive={setRemoveModal}/>
      </Modal>
    </>

  );
}

export default Basket;
