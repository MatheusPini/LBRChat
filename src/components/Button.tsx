import { useState } from "react"

type ButtonProps = {
  text?: string
  children?: string
}
export function Button(props: ButtonProps){
  const [counter, setCounter] = useState(0)
  function incremente(){
    setCounter(counter+1)
    console.log(counter)
  }
  return (
    // <button>{props.text || props.children || 'teste'}</button>
    <button onClick={incremente}>{counter}</button>
  )
}
