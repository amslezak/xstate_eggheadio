const ifAtFirstYouDontSucceed = Machine(
  {
    id: 'tryTryAgain',
    initial: 'idle',
    context: {
      tries: 0,
    },
    states: {
      idle: {
        on: {
          TRY: 'trying',
        },
      },
      trying: {
        entry: ['incTries'],
        on: {
          '': [
            { target: 'success', cond: 'triedHardEnough' },
            { target: 'idle' },
          ],
        },
      },
      success: {},
    },
  },
  {
    actions: {
      incTries: assign({ tries: (context, event) => context.tries + 1 }),
    },
    guards: {
      triedHardEnough: (context, event) => context.tries >= 3,
    },
  }
)
