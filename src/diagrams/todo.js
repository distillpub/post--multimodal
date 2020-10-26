import { Surface, Text } from '../pages/reactComponents/ui'
import React from 'react'

export default ({ to, value, children }) => {
  if (typeof window['todos'] === 'undefined') {
    window.todos = []
  }
  const id = `todo${todos.length}`

  todos.push({ to, id, value, children })

  return (
    <Surface
      marginY={10}
      background="hsla(40, 70%, 50%, 0.2)"
      border="1px solid hsla(40, 70%, 50%, 0.4)"
      fontSize="70%"
      padding={8}
      lineHeight="130%"
      borderRadius={4}
      width="fit-content"
      id={id}
    >
      <Text fontWeight="bold">
        TODO({to}, {value}):
      </Text>
      {children}
    </Surface>
  )
}
