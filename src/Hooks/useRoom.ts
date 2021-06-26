import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"
type QuestionType = {
  id: string
  author: {
      nome: string,
      avatar: string
  }
  content: string,
  isAnswered: boolean
  isHighLighted: boolean
  likeCount: number
  likeId: string | undefined
}
type firebaseQuestions = Record<string, {
  author: {
      nome: string,
      avatar: string
  }
  content: string,
  isAnswered: boolean
  isHighLighted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>
export function useRoom(roomId: string){
  const {user} = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    console.log(roomId)
    const roomReef = database.ref(`rooms/${roomId}`)

    roomReef.on('value', room => {
        const databaseRoom = room.val()
        const firebaseQuestions: firebaseQuestions = databaseRoom.questions ?? {}
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
            return {
                id: key,
                content: value.content,
                author: value.author,
                isHighLighted: value.isHighLighted,
                isAnswered: value.isAnswered,
                likeCount: Object.values(value.likes ?? {}).length,
                likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
            }
        })
        setTitle(databaseRoom.title)
        setQuestions(parsedQuestions)
    })
    return () => {
      roomReef.off('value')
    }
}, [roomId, user?.id])
return {questions, title}
}
