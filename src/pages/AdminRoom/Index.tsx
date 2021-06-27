import { useHistory, useParams } from 'react-router-dom'

import './styles.scss';
import logoImg from '../../assets/logo.svg';
import deleteImg from '../../assets/delete.svg';
import checkImg from '../../assets/check.svg';
import answerImg from '../../assets/answer.svg';
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

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true
    });
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
        <img onClick={() => history.push('/') } className="show-mobile pointer" src={ logoImg } alt="Letmeask"/>
        <div className="content">
          <img onClick={() => history.push('/') } src={ logoImg } className="hide-mobile pointer" alt="Letmeask"/>
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
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida"/>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta"/>
                    </button>
                  </>
                )}

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