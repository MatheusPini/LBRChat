import {Link} from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import {Button} from '../components/Button'
import '../styles/auth.scss'
export function NewRoom(){
  
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LBRChat" />
          
          <h2>Criar uma nova sala</h2>
          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button  type="submit">Entrar sala</Button>
            <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
          </form>
        </div>
      </main>
    </div>
  )
}