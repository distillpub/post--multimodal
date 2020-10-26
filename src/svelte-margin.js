import React, { useLayoutEffect, useRef } from 'react'

export default ({ component, container = null }) => {
  const containerEl = useRef(null)

  useLayoutEffect(() => {
    const C = component
    new C({ target: containerEl.current })
  })

  return container ? (
    React.cloneElement(container, { ref: containerEl })
  ) : (
    <div className="margin-diagram" ref={containerEl} />
  )
}
