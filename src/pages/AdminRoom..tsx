import { parse } from 'path'
import { FormEvent, useEffect, useState } from 'react'
import deleteImg from '../assets/images/delete.svg'
import { useParams, Link, useHistory } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../Hooks/useAuth'
import { useRoom } from '../Hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/room.scss'
type RoomParams = {
    id: string
}
export function AdminRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>()
    const [newQuestions, setNewQuestion] = useState("")
    const roomId = params.id
    const {questions, title} = useRoom(roomId)
    async function handleEndRoom(){
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/')
    }
    async function handleDeleteQuestion(questionId: string){
        if (window.confirm("Tem certeza que deseja excluir essa pergunta?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LBRChat" />
                    <div>
                    <RoomCode code={roomId} />
                    <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>

                    </div>
                    {/* <Link to="/rooms/-MctxcGLoL77iYAReTh8">teste</Link> */}
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">

                    {questions.map(question => {
                        return <Question key={question.id} content={question.content} author={question.author}>
                            <button
                            type="button"

                            onClick={()=> handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    })}
                </div>
            </main>
        </div>
    )
}