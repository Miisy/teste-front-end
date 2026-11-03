import { useEffect, useState } from 'react';
import './vitrine2.scss';

interface Produto {
  productName: string;
  descriptionShort: string;
  photo: string;
  price: number;
}

interface VitrineProps {
  titulo?: string;
  categoriaCarregar?: string; // Por defeito carrega TODOS
}

export default function VitrineProdutos2({ 
  titulo = 'Produtos relacionados',
  categoriaCarregar = 'TODOS' 
}: VitrineProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoModal, setProdutoModal] = useState<Produto | null>(null);
  const [indiceInicial, setIndiceInicial] = useState(0);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        if (categoriaCarregar === 'TODOS') {
          const categorias = ['Celular', 'Acessorios', 'Tablets', 'Notebooks', 'TV'];
          const promessas = categorias.map(cat => 
            fetch(`/products${cat}.json`)
              .then(res => res.json())
              .catch(() => null)
          );
          
          const resultados = await Promise.all(promessas);
          let todosProdutos: Produto[] = [];
          
          resultados.forEach(data => {
            if (data) {
              const lista = data.products || data;
              if (Array.isArray(lista)) {
                todosProdutos = [...todosProdutos, ...lista];
              }
            }
          });
          
          setProdutos(todosProdutos);
        } else {
          const response = await fetch(`/products${categoriaCarregar}.json`);
          const data = await response.json();
          const lista = data.products || data;
          
          if (Array.isArray(lista)) {
            setProdutos(lista);
          } else {
            setProdutos([]);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProdutos([]);
      }
    }

    carregarProdutos();
  }, [categoriaCarregar]);

  const proximoSlide = () => {
    if (indiceInicial + 4 < produtos.length) {
      setIndiceInicial(indiceInicial + 1);
    }
  };

  const slideAnterior = () => {
    if (indiceInicial > 0) {
      setIndiceInicial(indiceInicial - 1);
    }
  };

  const aumentarQuantidade = () => {
    if (quantidade < 10) setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  return (
    <section className="vitrine-section">
      <header className="vitrine-header-simples">
        <div className="linha-decorativa"></div>
        <h2 className="vitrine-titulo">{titulo}</h2>
        <div className="linha-decorativa"></div>
      </header>
      <a href="#ver-todos" className="link-ver-todos-centro">Ver todos</a>

      <div className="vitrine-conteudo">
        {produtos.length === 0 ? (
          <div className="nenhum-item">
            <p>Nenhum item foi encontrado no resultado da pesquisa.</p>
          </div>
        ) : (
          <>
            <button className="btn-seta esquerda" aria-label="Anterior" onClick={slideAnterior}>&lt;</button>
                  
            <ul className="lista-produtos">
              {produtos.slice(indiceInicial, indiceInicial + 4).map((produto, index) => {
                const precoFormatado = produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const precoAntigoFormatado = (produto.price * 1.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                return (
                  <li key={index}>
                    <article className="card-produto" onClick={() => { setQuantidade(1); setProdutoModal(produto); }}>
                      <figure className="produto-imagem">
                        <img src={produto.photo} alt={produto.productName} />
                      </figure>
                      <div className="produto-info">
                        <h3 className="produto-nome">{produto.descriptionShort}</h3>
                        <span className="preco-antigo">{precoAntigoFormatado}</span>
                        <strong className="preco-atual">{precoFormatado}</strong>
                        <span className="parcelas">ou 2x de R$ {(produto.price / 2).toFixed(2).replace('.', ',')} sem juros</span>
                        <span className="frete-gratis">Frete grátis</span>
                        
                        <button className="btn-comprar" onClick={(e) => { e.stopPropagation(); setQuantidade(1); setProdutoModal(produto); }}>
                          COMPRAR
                        </button>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <button className="btn-seta direita" aria-label="Próximo" onClick={proximoSlide}>&gt;</button>
          </>
        )}
      </div>

      {produtoModal && (
        <div className="modal-overlay" onClick={() => setProdutoModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setProdutoModal(null)}>&times;</button>
            <div className="modal-body">
              <div className="modal-image-container">
                <img src={produtoModal.photo} alt={produtoModal.productName} />
              </div>
              <div className="modal-details">
                <h3 className="modal-title">{produtoModal.productName}</h3>
                <div className="modal-price">
                  {produtoModal.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <p className="modal-description">Many desktop publishing packages and web page editors...</p>
                <a href="#detalhes" className="modal-link">Veja mais detalhes do produto &gt;</a>
                <div className="modal-actions">
                  <div className="quantidade-selector">
                    <button onClick={diminuirQuantidade}>&minus;</button>
                    <span>{String(quantidade).padStart(2, '0')}</span>
                    <button onClick={aumentarQuantidade}>&#43;</button>
                  </div>
                  <button className="btn-comprar-modal" onClick={() => { alert(`${quantidade} adicionado!`); setProdutoModal(null); }}>
                    COMPRAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}