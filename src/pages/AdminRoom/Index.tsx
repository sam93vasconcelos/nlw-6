import { useHistory, useParams } from 'react-router-dom'

import './styles.scss';
import logoImg from '../../assets/logo.svg';
import deleteImg from '../../assets/delete.svg';
import Button from '../../components/Button/Index'
import { RoomCode } from '../../components/RoomCode/Index';
// import { useAuth } from '../../hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { Question } from '../../components/Question/Index';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
}

function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <div><Toaster /></div>
      <header>
        <div className="content">
          <img src={ logoImg } alt="Letmeask"/>
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{ title }</h1>
          { questions.length > 0 && <span>{ questions.length } Pergunta{ questions.length > 1 && 's' }</span> }
        </div>

          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta"/>
                </button>
              </Question>
            )
          })}
      </main>
    </div>
  )
}

export default AdminRoom;