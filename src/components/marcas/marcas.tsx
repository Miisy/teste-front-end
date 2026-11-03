import './marcas.scss';

export default function Marcas() {
  // Criamos um array simples de 5 posições para renderizar os 5 círculos
  const marcas = [1, 2, 3, 4, 5];

  return (
    <section className="marcas-section">
      <h2 className="marcas-titulo">Navegue por marcas</h2>
      
      <div className="marcas-container">
        {marcas.map((item) => (
          <article key={item} className="marca-item">
            
            <img src="/logo.png" alt="Econverse" className="marca-logo" />
          </article>
        ))}
      </div>
    </section>
  );
}