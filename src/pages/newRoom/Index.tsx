
import { Link } from 'react-router-dom';

import illustrationImg from '../../assets/illustration.svg';
import logoImg from '../../assets/logo.svg';

import './styles.scss'

import Button from '../../components/button/Index'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Index() {
  const {user} = useContext(AuthContext);
  return (
    <div id="page-auth">
      <aside>
        <img src={ illustrationImg } alt="Ilustração de perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>
          Tire as dúvidas de sua audiência em tempo-real
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={ logoImg } alt="Letmeask"/>

          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Index;