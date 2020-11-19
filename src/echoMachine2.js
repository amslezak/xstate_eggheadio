const echoCallbackHandler = (context, event) => {
  return (callback, onEvent) => {
    onEvent((e) => {
      if (e.type === 'HEAR') callback('ECHO')
    })
  }
}

const echoMachine = Machine({
  id: 'echo',
  initial: 'listening',
  states: {
    listening: {
      invoke: {
        id: 'echoCallback',
        src: echoCallbackHandler,
      },
      on: {
        SPEAK: {
          // when "FOO", the onEvent function will test the type of event, and not execute the callback
          // actions: send('FOO', { to: 'echoCallback' }),

          // when "HEAR" is sent the onEvent functio will trigger the callback and execute the actions on the ECHO event
          actions: send('HEAR', { to: 'echoCallback' }),
        },
        ECHO: {
          actions: () => {
            console.log('echo, echo')
          },
        },
      },
    },
  },
})
