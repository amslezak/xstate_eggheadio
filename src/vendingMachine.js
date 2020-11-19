const { assign } = require('xstate')

const vendingMachine = Machine(
  {
    id: 'vendingMachine',
    initial: 'idle',
    context: {
      deposited: 0,
    },
    states: {
      idle: {
        on: {
          SELECT_ITEM: {
            target: 'vending',
            cond: 'depositedEnough',
          },
          DEPOSIT_QUARTER: {
            actions: ['addQuarter'],
          },
        },
      },
      vending: {},
    },
  },
  {
    actions: {
      addQuarter: assign({
        deposited: (context) => context.deposited + 25,
      }),
    },
    guards: {
      depositedEnough: (context, event) => {
        return context.deposited >= 100
      },
    },
  }
)
