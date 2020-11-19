const { Machine } = require('xstate')

const lightbulbMachine = Machine(
  {
    id: 'lightBulb',
    initial: 'unlit',
    states: {
      lit: {
        on: {
          BREAK: {
            target: 'broken',
            action: () => {
              console.log('transitioning to broken')
            },
          },
          TOGGLE: 'unlit',
        },
        exit: () => {
          console.log("It's dark and cold")
        },
      },
      unlit: {
        on: {
          BREAK: 'broken',
          TOGGLE: 'lit',
        },
      },
      broken: {
        entry: ['logBroken'],
        exit: ['logFixed'],
        on: {
          FIX: 'unlit',
        },
      },
    },
  },
  {
    actions: {
      logBroken: (context, event) => {
        console.log(`yo I'm broken in the ${event.location}`)
      },
      logFixed: (context, event) => {
        console.log("I'm fixed")
      },
    },
  }
)
