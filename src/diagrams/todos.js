import { Surface, Text } from '../pages/reactComponents/ui'
import { Portal } from 'react-portal'
import React, { useState } from 'react'
import { sortBy, capitalize, uniq, reverse } from 'lodash'

export default () => {
  const [active, setActive] = useState(localStorage.getItem('whoTask') || 'All')

  const [hidden, setIsHidden] = useState(false)
  function toggle_hidden() {
    activeTodos.map(({ to, id, value, children }) => {
      document.getElementById(id).style.display = hidden? 'flex' : 'none';
    }); 
    setIsHidden(!hidden);
  }

  const onSetActive = (who) => {
    localStorage.setItem('whoTask', who)
    setActive(who);
  }

  const [isClosed, setIsClosed] = useState(true)

  let allTodos = []
  if (typeof window['todos'] !== 'undefined') {
    allTodos = window['todos']
  }

  if (allTodos.length === 0) {
    return false
  }

  console.log('all todos are', allTodos)
  const allPeople = ['All', ...uniq(allTodos.map(({ to }) => to.toLowerCase()))]

  const activeTodos = reverse(sortBy(allTodos, 'value')).filter(({ to }) => {
    if (active === 'All') return true
    return to.toLowerCase() === active.toLowerCase()
  })

  const shortName = (name) => (name === 'Chelsea' ? 'Voss' : name);


  return (
    <Portal>
      <Surface
        position="fixed"
        right={20}
        bottom={20}
        marginY={10}
        background="rgb(246,236,217)"
        border="1px solid hsla(40, 70%, 50%, 0.4)"
        borderRadius={3}
        fontSize="70%"
        padding={8}
        lineHeight="130%"
        width={300}
      >
        <Surface flexFlow="row" justifyContent="space-between">
          <Text fontWeight="bold">TODOS ({activeTodos.length})</Text>
          <Surface flexFlow="row">
            {allPeople.map((name) => (
              <Text
                onClick={() => onSetActive(name)}
                marginX={3}
                fontWeight={active === name && 'bold'}
                cursor="pointer"
              >
                {capitalize(name)}
              </Text>
            ))}
          </Surface>
          <Text onClick={() => setIsClosed(!isClosed)} cursor="pointer">
            {isClosed ? 'Open' : 'Close'}
          </Text>
          <Text onClick={toggle_hidden} cursor="pointer">
            {hidden ? "Reveal" : "Hide"}
          </Text>
        </Surface>
        {!isClosed && (
          <Surface overflowY="scroll" height={400} marginTop={6}>
            {activeTodos.map(({ to, id, value, children }, index) => (
              <Surface
                borderBottom={
                  index < activeTodos.length - 1 &&
                  'border 1px solid rgba(0, 0, 0, 0.1)'
                }
                flexFlow="row"
                key={id}
                marginY={3}
              >
                <Surface width={56}>
                  <a
                    style={{
                      fontWeight: 'bold',
                      marginRight: 3,
                      textDecoration: 'none',
                    }}
                    href={`#${id}`}
                    fontWeight="bold"
                  >
                    {shortName(capitalize(to))}({value}):
                  </a>
                </Surface>
                <Surface width={200}>{children}</Surface>
              </Surface>
            ))}
          </Surface>
        )}
      </Surface>
    </Portal>
  )
}
