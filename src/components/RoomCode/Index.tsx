import copyImg from '../../assets/copy.svg';
import './styles.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={ copyImg } alt="Copy Room Code"/>
      </div>
      <span>Sala {props.code}</span>
      <span className="show-mobile">Código da sala</span>
    </button>
  )
}