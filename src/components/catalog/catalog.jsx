import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import ReactPaginate from "react-paginate";

import {selectDress} from "../../store/dressSlise";
import {selectPagination} from "../../store/paginationSlise";
import {selectPage} from "../../store/paginationSlise";
import {selectFilter, selectSort} from "../../store/filterSlise";


import {renderDressSortByPriceUp, renderDressSortByPriceDown, renderDressSortByReviewsUp, renderDressSortByReviewsDown, filterByPrice} from "../../utils";
import {DIRECTION_DOWN, DIRECTION_UP, SORT_BY_REVIEW, SORT_BY_PRICE} from "../../utils";
import CatalogItem from "../catalog-item/catalog-item";
import Modal from "../modal/modal";
import AddContent from "../add-content/add-content";
import SortPanel from "../sort-panel/sort-panel";

function Catalog() {
  const [modalActive, setModalActive] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const DRESS_PER_PAGE = 9;
  let pageCount = 1;

  const dress = useSelector(selectDress);
  const pageNumber = useSelector(selectPagination);
  const filter = useSelector(selectFilter);
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();

  let cloneDress = JSON.parse(JSON.stringify(dress));

  useEffect(() => {
    onSortingDress();
  }, [sort]);

  useEffect(() => {
    renderDress();
  }, [cloneDress]);

  useEffect(() => {
    setSuccessModal(false);
  }, [modalActive]);

  const renderPageCount = () => {
    pageCount = Math.ceil(cloneDress.length / DRESS_PER_PAGE);
    return pageCount;
  };

  const pagesVisites = pageNumber * DRESS_PER_PAGE;

  const onPageChangeClick = ({selected}) => {
    dispatch(selectPage(selected));
  };

  function filterChechbox(array = [], filters = {}) {
    const keys = Object.keys(filters).filter((key) => filters.hasOwnProperty(key));
    return array.filter((elem) => {
      const commonKeys = keys.filter((key) => elem.hasOwnProperty(key));
      return commonKeys.reduce((flag, key) => (flag && filters[key].includes(elem[key])), true);
    });
  }

  // фильтры

  let type = filter.typeFilterArr;
  let strings = filter.stringFilterArr;

  let filterType = {
    type,
  };

  let filterStrings = {
    strings
  };

  // eslint-disable-next-line consistent-return
  const onFilterByCheckbox = () => {

    if (type.length > 0) {
      return (cloneDress = filterChechbox(cloneDress, filterType));
    }

    if (strings.length > 0) {
      return (cloneDress = filterChechbox(cloneDress, filterStrings));
    }
    return cloneDress;
  };


  const onFilters = () => {
    if (Object.keys(filter).length !== 0) {
      if (type.length === 0 && strings.length === 0) {
        return cloneDress;
      }

      onFilterByCheckbox();


      // cloneDress = filterChechbox(cloneDress, filterData);

      // по цене

      cloneDress = filterByPrice(cloneDress, filter.tempMin, filter.tempMax);
    }
    return cloneDress;
  };


  const onSortingDress = () => {

    if (sort.type === SORT_BY_PRICE && sort.direction === DIRECTION_UP) {
      renderDressSortByPriceUp(cloneDress);
    }

    // цена по убыванию

    if (sort.type === SORT_BY_PRICE && sort.direction === DIRECTION_DOWN) {
      renderDressSortByPriceDown(cloneDress);
    }

    // рейтинг по возрастанию

    if (sort.type === SORT_BY_REVIEW && sort.direction === DIRECTION_UP) {
      renderDressSortByReviewsUp(cloneDress);
    }
    // рейтинг по убыванию

    if (sort.type === SORT_BY_REVIEW && sort.direction === DIRECTION_DOWN) {
      renderDressSortByReviewsDown(cloneDress);
    }

    if (sort.type === SORT_BY_PRICE) {
      renderDressSortByPriceUp(cloneDress);
    }
    if (sort.type === SORT_BY_REVIEW) {
      renderDressSortByReviewsDown(cloneDress);
    }

    if (sort.direction === DIRECTION_UP) {
      renderDressSortByPriceUp(cloneDress);
    }
    if (sort.direction === DIRECTION_DOWN) {
      renderDressSortByPriceDown(cloneDress);
    }
  };

  // отрисовка основного массива

  const renderDress = () => {
    onFilters();
    onSortingDress();
    renderPageCount();

    if (cloneDress.length === 0) {
      cloneDress = dress;
    }

    return (cloneDress.slice(pagesVisites, pagesVisites + DRESS_PER_PAGE)
      .map((item) => <CatalogItem key={item.articul}
        item={item}
        onModalActive={setModalActive}
      />));
  };

  let guitarPage = renderDress();

  return (
    <>
      <section className="catalog">
        <h2 className="visually-hidden">Каталог</h2>
        <div className="catalog__sort-panel sort-panel" >
          <SortPanel/>
        </div>
        <ul className="catalog__list">
          {guitarPage}
        </ul>
        <ReactPaginate
          previousLabel={`Назад`}
          nextLabel={`Далее`}
          breakLabel={`...`}
          breakClassName={`pagination__break`}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={onPageChangeClick}
          pageClassName={`catalog__pagination-item`}
          containerClassName={`catalog__pagination`}
          activeClassName={`catalog__pagination--active`}
          previousClassName={`catalog__pagination--prev`}
          nextClassName={`catalog__pagination--next`}
          disabledClassName={`catalog__pagination-controls--disabled`}
        />
      </section>

      <Modal
        modalActive={modalActive}
        onModalActive={setModalActive}
      >
        <AddContent
          onModalAddActive={setModalActive}
          successModal={successModal}
          onSuccessModal={setSuccessModal}

        />
      </Modal>
    </>
  );
}

export default Catalog;
