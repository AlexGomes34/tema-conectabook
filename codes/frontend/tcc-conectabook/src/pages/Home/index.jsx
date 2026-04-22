import image from '../../assets/image.png';
import Button from '../../components/button';
import hpCapa from '../../assets/hpCapa.png';
import fotoPessoa from '../../assets/fotoPessoa.jpg';
import livro from '../../assets/livro.jpg';
import eventos from '../../assets/eventos.jpg'
import cafeteria from '../../assets/cafeteria.jpeg'

import HeaderHome from './headerHome';

import './style.css'

const EVENTOS_DATA = [
  {nome: "Bienal de São Paulo", image:eventos},
  {nome: "Bienal de São Paulo", image:eventos},
  {nome: "Bienal de São Paulo", image:eventos},
]

const CAFETERIA_DATA = [
  {id: 1, nome:"Cafeteria Batatinha",image:cafeteria},
  {id: 2, nome:"Cafeteria Batatinha",image:cafeteria},
  {id: 3, nome:"Cafeteria Batatinha",image:cafeteria},
  {id: 4, nome:"Cafeteria Batatinha",image:cafeteria}
]

function CafeteriaCard({nome,image}){
  return(
    <div className="cafeteria">
      <img src={image} alt="" />
      <h3>{nome}</h3>
    </div>
  )
}

function EventoCard({nome,image}){
  return(
    <div className="evento">
      <img src={image} alt="" />
      <h3>{nome}</h3>
    </div>
  )
}

function Home() {

  return (
    <div>
      <HeaderHome />

      <main>

        <div className='info'>
          <div className="textos">
            <h1>ConectaBook: Uma plataforma para conexão de leitores.</h1>
            <p>
              Uma plataforma feita para conectar leitores, descobrir novas histórias e compartilhar experiências através de clubes, avaliações e encontros literários.
            </p>
          </div>


          <div className='buttons'>
            <Button text="Criar Conta" onClick={() => alert("Clicou!")} />
            <Button text="Entrar" onClick={() => alert("Clicou!")} />
          </div>
        </div>

        <img className='image' src={image} alt="" />

      </main>

      <section className='clubesSection'>
        <div className="clubeText">
          <h2>Encontre um clube que combine com você</h2>
          <Button text={"Ver Clubes"}></Button>
        </div>

        <div className="clubes">
          <div className="clube">
            <img src={hpCapa} alt="Logo Harry Potter" />
            <h3>Clube Harry Potter</h3>
            <p>700 Membros</p>
          </div>
          <div className="clube">
            <img src={hpCapa} alt="Logo Harry Potter" />
            <h3>Clube Harry Potter</h3>
            <p>700 Membros</p>
          </div>
          <div className="clube">
            <img src={hpCapa} alt="Logo Harry Potter" />
            <h3>Clube Harry Potter</h3>
            <p>700 Membros</p>
          </div>
          <div className="clube">
            <img src={hpCapa} alt="Logo Harry Potter" />
            <h3>Clube Harry Potter</h3>
            <p>700 Membros</p>
          </div>
        </div>
      </section>

      <section className='feedbackSection'>
        <h2>Publique suas opiniões literárias</h2>
        <div className="opinioes">

          <div className="opiniao">
            <img src={fotoPessoa} alt="" />
            <div className="infoPessoa">
              <div className="leitorLivro">
                <h3>Eloa Raposa</h3>
                <p className='feedbackLivro'>Crime e Castigo - Dostoieviski</p>

              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta, cum necessitatibus dolorem fuga similique ex odit molestiae magni id! Suscipit eveniet facilis aperiam ullam commodi repudiandae, illum eius! Dolore?</p>
            </div>

          </div>
          <div className="opiniao">
            <img src={fotoPessoa} alt="" />
            <div className="infoPessoa">
              <div className="leitorLivro">
                <h3>Eloa Raposa</h3>
                <p className='feedbackLivro'>Crime e Castigo - Dostoieviski</p>

              </div>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur atque officia quam earum velit quia ipsam sint. Itaque, mollitia assumenda.</p>
            </div>

          </div>
          <div className="opiniao">
            <img src={fotoPessoa} alt="" />
            <div className="infoPessoa">
              <div className="leitorLivro">
                <h3>Eloa Raposa</h3>
                <p className='feedbackLivro'>Crime e Castigo - Dostoieviski</p>

              </div>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae nemo consequuntur modi, doloribus itaque rem magni neque ad. Praesentium rerum exercitationem quidem eum pariatur perspiciatis perferendis architecto ratione quos. Expedita?</p>
            </div>

          </div>
          <div className="opiniao">
            <img src={fotoPessoa} alt="" />
            <div className="infoPessoa">
              <div className="leitorLivro">
                <h3>Eloa Raposa</h3>
                <p className='feedbackLivro'>Crime e Castigo - Dostoieviski</p>

              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nam voluptas repellat expedita, at quas quod quae voluptates autem consequuntur quidem ipsam cumque ab consectetur.</p>
            </div>
          </div>

        </div>
      </section>

      <section className='bookSection'>
        <h2>Veja os livros em destaque no momento</h2>
        <div className="livros">
          <div className="livro">
            <img src={livro} alt="" />
            <h3>A esperança da rainha</h3>
            <p>E. K. Johnston</p>
          </div>
          <div className="livro">
          <img src={livro} alt="" />
          <h3>A esperança da rainha</h3>
          <p>E. K. Johnston</p>
          </div>
          <div className="livro">
          <img src={livro} alt="" />
          <h3>A esperança da rainha</h3>
          <p>E. K. Johnston</p>
          </div>
          <div className="livro">
          <img src={livro} alt="" />
          <h3>A esperança da rainha</h3>
          <p>E. K. Johnston</p>
          </div>
          <div className="livro">
          <img src={livro} alt="" />
          <h3>A esperança da rainha</h3>
          <p>E. K. Johnston</p>
          </div>
        </div>
      </section>

      <section className='eventSection'>
        <h2>Veja os Eventos que iram ocorrer</h2>
        <div className="eventos">
          {EVENTOS_DATA.map((evento) =>(
            <EventoCard
            nome={evento.nome}
            image={evento.image}
            />
          ))}
        </div>
      </section>

      <section className='cafeteriaSection'>
        <h2>Encontre uma cafeteria para combinar com sua leitura</h2>
        <div className="cafeterias">
          {CAFETERIA_DATA.map((cafeteria) =>(
            <CafeteriaCard
            nome = {cafeteria.nome}
            image={cafeteria.image}
            
            />
          ))

          }
        </div>
      </section>

      <footer>
        <p>© 2026 ConectaBook — 2026</p>
      </footer>
    </div>
  )
}

export default Home
