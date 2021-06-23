import { parse } from 'path'
import { FormEvent, useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import {Button} from '../components/Button'
import {RoomCode} from '../components/RoomCode'
import { useAuth } from '../Hooks/useAuth'
import { database } from '../services/firebase'
import '../styles/room.scss'
type RoomParams = {
    id: string
}
type Question = {
    id: string
    author: {
        nome: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean
    isHightLighted: string
}
type firebaseQuestions = Record<string, {
    author: {
        nome: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean
    isHightLighted: string
}>
export function Room(){
    const {user} = useAuth()
    const params = useParams<RoomParams>()
    const [newQuestions, setNewQuestion] = useState("")
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState("")
    const roomId = params.id

    useEffect(()=> {
        console.log(roomId)
        const roomReef = database.ref(`rooms/${roomId}`)

        roomReef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: firebaseQuestions = databaseRoom.questions  ?? {}
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHightLighted: value.isHightLighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])
    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()
        if(newQuestions.trim() == ""){
            return
        }
        if(!user){
            // react hot toast instalar para toastip
            throw new Error('erro')
        }
        const question = {
            content: newQuestions,
            author: {
                name: user.nome,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }
        await database.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LBRChat" />
                    <RoomCode code={roomId} />

                    <Link to="/rooms/-MctxcGLoL77iYAReTh8">teste</Link>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?" onChange={event=> setNewQuestion(event.target.value)} value={newQuestions} />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.nome} />
                                <span>{user.nome}</span>
                            </div>
                        ) :(
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}