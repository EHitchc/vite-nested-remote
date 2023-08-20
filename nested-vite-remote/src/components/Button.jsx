
import "./Button.css"

import { Suspense, useState } from "react"

export const Button = () => {
  const [state, setState] = useState(0)
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <button id='click-btn' className='shared-btn' onClick={() => setState((s) => s + 1)}>Button from nested Vite remote: {state}</button>
      </div>
    </>
  )
}

export default Button