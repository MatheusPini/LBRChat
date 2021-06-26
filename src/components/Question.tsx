import {ReactNode} from 'react'
import cx from 'classnames'
import '../styles/question.scss'
type QuestionProps = {
  content: string
  author:{
    nome: string
    avatar: string
  }
  children?: ReactNode
  isAnswered?: boolean
  isHighLighted?: boolean | undefined
}
export function Question({content, author, children, isAnswered = false, isHighLighted = false}: QuestionProps){
  return (
    <div className={cx(
      'question',
      {answered: isAnswered},
      {highlighted: isHighLighted && !isAnswered}
    )}>
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