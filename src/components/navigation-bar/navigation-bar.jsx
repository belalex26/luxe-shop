import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectCard} from "../../store/cardSlise";

function NavigationBar() {
  const cart = useSelector(selectCard);
  const counts = Object.values(cart);

  const initTotalCount = 0;
  let totalCount = initTotalCount;

  useEffect(() => {
    renderTotalCount();
  }, [counts]);

  const renderTotalCount = () => {
    if (counts.length === initTotalCount) {
      totalCount = initTotalCount;
      return (totalCount);
    }

    totalCount = counts.reduce((sum, current) => sum + current);
    return totalCount;
  };

  let totalCountsItem = renderTotalCount();

  return (
    <ul className="navigation-bar">
      <li className="navigation-bar__item">
        <a className="navigation-bar__link" href="/maps" aria-label="Контакты">
          <svg className="navigation-bar__link-icon navigation-bar__link-icon--maps" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.875 19.3523C25.875 23.8068 19.875 27.625 19.875 27.625C19.875 27.625 13.875 23.8068 13.875 19.3523C13.875 17.8333 14.5071 16.3766 15.6324 15.3025C16.7576 14.2284 18.2837 13.625 19.875 13.625C21.4663 13.625 22.9924 14.2284 24.1176 15.3025C25.2429 16.3766 25.875 17.8333 25.875 19.3523Z" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.875 21.2615C20.9796 21.2615 21.875 20.4068 21.875 19.3524C21.875 18.2981 20.9796 17.4434 19.875 17.4434C18.7704 17.4434 17.875 18.2981 17.875 19.3524C17.875 20.4068 18.7704 21.2615 19.875 21.2615Z" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </li>
      <li className="navigation-bar__item navigation-bar__item--search">
        <a className="navigation-bar__link" href="/search" aria-label="Поиск">
          <svg className="navigation-bar__link-icon" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.0276 22.0289L26.7934 25.7948C26.9257 25.9273 27.0001 26.1069 27 26.2942C26.9999 26.4814 26.9255 26.661 26.793 26.7934C26.6606 26.9257 26.481 27.0001 26.2937 27C26.1064 26.9999 25.9269 26.9255 25.7945 26.793L22.0287 23.0271C20.903 23.8991 19.4873 24.3094 18.0698 24.1746C16.6522 24.0399 15.3393 23.3701 14.398 22.3016C13.4567 21.2332 12.9578 19.8462 13.0028 18.423C13.0478 16.9997 13.6333 15.6471 14.6401 14.6402C15.647 13.6333 16.9996 13.0478 18.4229 13.0028C19.8461 12.9578 21.233 13.4567 22.3014 14.398C23.3699 15.3393 24.0396 16.6523 24.1743 18.0699C24.3091 19.4875 23.8988 20.9031 23.0269 22.0289H23.0276ZM18.6003 22.7996C19.7141 22.7996 20.7824 22.3571 21.57 21.5695C22.3576 20.7818 22.8001 19.7136 22.8001 18.5997C22.8001 17.4858 22.3576 16.4176 21.57 15.6299C20.7824 14.8423 19.7141 14.3998 18.6003 14.3998C17.4864 14.3998 16.4182 14.8423 15.6306 15.6299C14.8429 16.4176 14.4005 17.4858 14.4005 18.5997C14.4005 19.7136 14.8429 20.7818 15.6306 21.5695C16.4182 22.3571 17.4864 22.7996 18.6003 22.7996Z" />
          </svg>
        </a>
      </li>
      <li className="navigation-bar__item">
        <Link className="navigation-bar__link" to="/basket" aria-label="Корзина">
          <svg className="navigation-bar__link-icon" width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3798 6.59316C14.3329 6.5283 14.2746 6.47622 14.209 6.44052C14.1434 6.40482 14.072 6.38633 13.9998 6.38634H10.9998V4.02272C10.9998 3.55256 10.8418 3.10167 10.5605 2.76922C10.2792 2.43677 9.89763 2.25 9.4998 2.25H6.4998C6.10198 2.25 5.72045 2.43677 5.43914 2.76922C5.15784 3.10167 4.9998 3.55256 4.9998 4.02272V6.38634H1.9998C1.92733 6.38537 1.85554 6.40303 1.78941 6.43811C1.72328 6.47318 1.6644 6.52483 1.61684 6.58947C1.56928 6.65411 1.53418 6.73019 1.51397 6.81246C1.49376 6.89472 1.48893 6.98119 1.4998 7.06588L2.4398 14.2454C2.47596 14.5272 2.59709 14.7841 2.78085 14.9687C2.96461 15.1533 3.19864 15.2531 3.4398 15.2499H12.5698C12.811 15.2531 13.045 15.1533 13.2288 14.9687C13.4125 14.7841 13.5336 14.5272 13.5698 14.2454L14.4998 7.06588C14.5098 6.98152 14.5043 6.8956 14.4836 6.814C14.4629 6.73241 14.4275 6.65707 14.3798 6.59316ZM5.9998 4.02272C5.9998 3.866 6.05248 3.7157 6.14625 3.60488C6.24002 3.49407 6.36719 3.43181 6.4998 3.43181H9.4998C9.63241 3.43181 9.75959 3.49407 9.85336 3.60488C9.94712 3.7157 9.9998 3.866 9.9998 4.02272V6.38634H5.9998V4.02272ZM12.5698 14.0681H3.4298L2.5848 7.56815H13.4148L12.5698 14.0681Z" />
          </svg>
        </Link>
        <span className={totalCount !== 0 ? `navigation-bar__item-basket-increment navigation-bar__item-basket-increment--active` : `navigation-bar__item-basket-increment`}>{totalCountsItem}</span>
      </li>
    </ul>

  );
}

export default NavigationBar;
