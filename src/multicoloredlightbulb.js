const { assign } = require('xstate')

const multiColoredBulbMachine = Machine(
  {
    id: 'multiColoredBulb',
    initial: 'unlit',
    context: {
      color: '#fff',
    },
    states: {
      lit: {
        on: {
          BREAK: 'broken',
          TOGGLE: 'unlit',
          // CHANGE_COLOR: {
          //   actions: assign({
          //     color: '#f00',
          //   }),
          // },
          // CHANGE_COLOR: {
          //   actions: assign({
          //     color: (context, event) => event.color,
          //   }),
          // },
          CHANGE_COLOR: {
            actions: ['changeColor'],
          },
        },
      },
      unlit: {
        on: {
          BREAK: 'broken',
          TOGGLE: 'lit',
        },
      },
      broken: {},
    },
  },
  {
    actions: {
      changeColor: assign({
        color: (context, event) => event.color,
      }),
    },
  }
)
