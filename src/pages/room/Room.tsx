import { useParams } from 'react-router-dom'

import './styles.scss';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/button/Index'
import { RoomCode } from '../../components/roomCode/RoomCode';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

type RoomParams = {
  id: string;
}

function Room() {
  const user = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  
  const roomId = params.id;

  async function handleSendQuestion() {
    if(newQuestion.trim() === '') {
      return;
    }

    if(!user) {
      
    }
  }

  return (
    <div id="page-room">
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

          <form>
            <textarea
              placeholder="O que você quer perguntar?"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
            />

            <div className="form-footer">
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
              <Button
                type="submit"
              >Enviar Pergunta</Button>
            </div>
          </form>
      </main>
    </div>
  )
}

export default Room;