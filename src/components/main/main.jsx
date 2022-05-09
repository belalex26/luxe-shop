import React from "react";
import Catalog from "../catalog/catalog";
import Filters from "../filters/filters";
import Footer from "../footer/footer";
import Header from "../header/header";


function Main() {

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="visually-hidden">Luxe shop интернет магазин одежды</h1>
        <section className="main__catalog">
          <h2 className="main__catalog-title">Каталог</h2>
          <ul className="main__catalog-breadcrumps">
            <li className="main__catalog-breadcrumps-item">
              <a className="main__catalog-breadcrumps-link" href="#">Главная</a>
            </li>
            <li className="main__catalog-breadcrumps-item">
              <p className="main__catalog-breadcrumps-text">Каталог</p>
            </li>
          </ul>
          <aside className="main__catalog-filters filters" >
            <Filters />
          </aside>
          <Catalog />
        </section>
      </main>
      <Footer />
    </>

  );
}

export default Main;
