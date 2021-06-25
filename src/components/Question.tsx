import {ReactNode} from 'react'
import '../styles/question.scss'
type QuestionProps = {
  content: string
  author:{
    nome: string
    avatar: string
  }
  children?: ReactNode
}
export function Question({content, author, children}: QuestionProps){
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.nome} />
          <span>{author.nome}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}