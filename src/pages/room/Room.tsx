import { useParams } from 'react-router-dom'

import './styles.scss';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/button/Index'
import { RoomCode } from '../../components/roomCode/RoomCode';
import { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../../services/firebase';
import { useEffect } from 'react';

type RoomParams = {
  id: string;
}

function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  
  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once(`value`, room => {
      console.log(room.val());
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === '') {
      return;
    }

    if(!user) {
      toast.error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHightLighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <div><Toaster /></div>
      <header>
        <div className="content">
          <img src={ logoImg } alt="Letmeask"/>
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 Perguntas</span>
        </div>

          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder="O que você quer perguntar?"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
            />

            <div className="form-footer">
              { user ? (
                <div className="user-info">
                  <img src={ user.avatar } alt={user.name}/>
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta, <button>faça seu login</button>
                </span>
              ) }
              <Button
                type="submit"
                disabled={!user}
              >Enviar Pergunta</Button>
            </div>
          </form>
      </main>
    </div>
  )
}

export default Room;