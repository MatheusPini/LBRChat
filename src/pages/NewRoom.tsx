import {Link, useHistory} from 'react-router-dom'
import {FormEvent, useState} from 'react'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import {Button} from '../components/Button'
import '../styles/auth.scss'
import { database } from '../services/firebase'
import { useAuth } from '../Hooks/useAuth'

export function NewRoom(){
  const {user} = useAuth()
  const [newRoom, setNemRoom] = useState("")
  const history = useHistory()
  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()
    if(newRoom.trim() === ''){
      return
    }
    const roomRef = database.ref('rooms')
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })
    history.push(`/rooms/${firebaseRoom.key}`)
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LBRChat" />
          
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" 
            placeholder="Nome da sala" 
            onChange={event => setNemRoom(event.target.value)} 
            value={newRoom} />
            <Button  type="submit">Entrar sala</Button>
            <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
          </form>
        </div>
      </main>
    </div>
  )
}