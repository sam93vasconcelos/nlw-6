import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/illustration.svg';
import logoImg from '../../assets/logo.svg';
import googleIconImg from '../../assets/google-icon.svg';

import './styles.scss'

import Button from '../../components/Button/Index'
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { database } from '../../services/firebase';
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      toast.error('Room does not exists.');

      return;
    }

    if(roomRef.val().endedAt) {
      toast.error('Room already closed');

      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <div><Toaster /></div>
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

          <form onSubmit={ handleJoinRoom }>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event?.target.value)}
              value={ roomCode }
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home;