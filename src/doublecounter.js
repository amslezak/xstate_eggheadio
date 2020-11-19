const { assign } = require('xstate/lib/actionTypes')

const doubleCounterMachine = Machine(
  {
    id: 'doubleCounter',
    initial: 'idle',
    context: {
      count: 0,
      previousCount: undefined,
    },
    states: {
      idle: {
        on: {
          INC_COUNT_TWICE: {
            actions: [
              (ctx) => console.log('before', ctx.previousCount),
              'setPreviousCount',
              'incCount',
              'incCount',
              (ctx) => console.log('after', ctx.count),
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      incCount: assign({
        count: (context) => context.count + 1,
      }),
      setPreviousCount: assign({
        previousCount: (context) => context.count,
      }),
    },
  }
)
