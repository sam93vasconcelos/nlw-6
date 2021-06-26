import { useParams } from 'react-router-dom'

import './styles.scss';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button/Index'
import { RoomCode } from '../../components/RoomCode/Index';
// import { useAuth } from '../../hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { Question } from '../../components/Question/Index';
import { useRoom } from '../../hooks/useRoom';

type RoomParams = {
  id: string;
}

function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId);

  return (
    <div id="page-room">
      <div><Toaster /></div>
      <header>
        <div className="content">
          <img src={ logoImg } alt="Letmeask"/>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar Sala</Button>
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
              />
            )
          })}
      </main>
    </div>
  )
}

export default AdminRoom;