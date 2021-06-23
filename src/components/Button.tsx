import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export function Button(props: ButtonProps){
  return (
    // <button>{props.text || props.children || 'teste'}</button>
    // <button onClick={incremente}>{counter}</button>
    <button className="button" {...props} />
  )
}
