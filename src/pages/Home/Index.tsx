import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/illustration.svg';
import logoImg from '../../assets/logo.svg';
import googleIconImg from '../../assets/google-icon.svg';

import './styles.scss'

import Button from '../../components/button/Index'
import { auth, firebase } from '../../services/firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from '../../hooks/useAuth';

function Index() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

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

          <button onClick={ handleCreateRoom } className="create-room">
            <img src={ googleIconImg } alt="Logo do Google"/>
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Index;