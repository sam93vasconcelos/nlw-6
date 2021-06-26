import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from './useAuth';

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const { user } = useAuth();
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on(`value`, room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighLighted: value.isHighLighted,
          likeCount: Object.values(value?.likes),
          hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
        }
      })

      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title);
    });
  }, [roomId]);

  return { questions, title }
}