import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {body, ESC_PRESS} from "../../utils";

const AddModal = ({...props}) => {
  // eslint-disable-next-line react/prop-types
  const {modalActive, onModalActive, children} = props;

  useEffect(() => {
    bodyScroll();
  });

  useEffect(() => {
    document.addEventListener(`keydown`, onClose, {passive: true});
    return () => document.removeEventListener(`keydown`, onClose);
  });

  const bodyScroll = () => {
    if (modalActive) {
      return (body.style.overflow = `hidden`);
    }
    return (body.style.overflow = `auto`);
  };

  const onClose = (evt) => {
    if (evt.keyCode === ESC_PRESS) {
      onModalCloseClick();
    }
  };

  const onModalCloseClick = () => {
    onModalActive(false);
    bodyScroll();
  };


  return (
    <div className={modalActive ? `modal modal--active` : `modal`} onClick={() => onModalActive(false)} role="dialog" tabIndex="-1">
      <div className={modalActive ? `modal__content modal__content--active` : `modal__content`} onClick={(evt) => evt.stopPropagation()}>
        {children}
        <button className="modal__close" onClick={onModalCloseClick} aria-label="закрыть"></button>
      </div>
    </div>
  );
};

AddModal.propTypes = {
  modalActive: PropTypes.bool,
  onModalActive: PropTypes.func,
};

export default AddModal;
