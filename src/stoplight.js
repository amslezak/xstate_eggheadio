const { assign } = require('xstate')

const stoplightMachine = Machine(
  {
    id: 'stoplight',
    initial: 'red',
    context: { rushHourMultiplier: 2 },
    on: {
      INC_RUSH_HOUR: { actions: ['incRushHour'] },
      DEC_RUSH_HOUR: { actions: ['decRushHour'] },
    },
    states: {
      red: { after: { RED_TIMER: 'green' } },
      green: { after: { GREEN_TIMER: 'yellow' } },
      yellow: { after: { YELLOW_TIMER: 'red' } },
    },
  },
  {
    actions: {
      incRushHour: assign({
        rushHourMultiplier: (ctx) => (ctx.rushHourMultiplier + 0.1).toFixed(2),
      }),
      decRushHour: assign({
        rushHourMultiplier: (ctx) => (ctx.rushHourMultiplier - 0.1).toFixed(2),
      }),
    },
    delays: {
      GREEN_TIMER: (ctx) => ctx.rushHourMultiplier * 2000,
      YELLOW_TIMER: (ctx) => ctx.rushHourMultiplier * 1000,
      RED_TIMER: (ctx) => ctx.rushHourMultiplier * 1000,
    },
  }
)
