import './Banner.scss';

export default function Banner() {
  return (
    <section className="banner-principal">
      <div className="conteudo-banner">
        <span className="titulo">Venha conhecer nossas promoções</span>
        <div className="oferta">
          <span className="span">50% Off </span> nos produtos
        </div>
        <button className="button">Ver Produto</button>
      </div>
    </section>
  );
}