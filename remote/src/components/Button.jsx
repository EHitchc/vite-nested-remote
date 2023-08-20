
import "./Button.css"

import { Suspense, lazy, useState } from "react"

const WebpackButton = lazy(() => import('nestedWebpackRemote/Button'));
const ViteButton = lazy(() => import('nestedViteRemote/Button'));

export const Button = () => {
  const [state, setState] = useState(0)
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <button id='click-btn' className='shared-btn' onClick={() => setState((s) => s + 1)}>Click me: {state}</button>
      </div>
      <div>
        <Suspense fallback={<h1>Loading Vite MFE</h1>}>
          <ViteButton />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<h1>Loading Webpack MFE</h1>}>
          <WebpackButton />
        </Suspense>
      </div>
    </>
  )
}

export default Button