const spaceHeater = Machine({
  id: 'spaceHeater',
  initial: 'poweredOff',
  states: {
    poweredOff: {
      on: { TOGGLE_POWER: 'poweredOn.history' },
    },
    poweredOn: {
      on: { TOGGLE_POWER: 'poweredOff' },
      type: 'parallel',
      states: {
        heat: {
          initial: 'lowHeat',
          states: {
            lowHeat: {
              on: { TOGGLE_HEAT: 'highHeat' },
            },
            highHeat: {
              on: { TOGGLE_HEAT: 'lowHeat' },
            },
          },
        },
        oscillation: {
          initial: 'disabled',
          states: {
            enabled: {
              on: {
                TOGGLE_OSC: 'disabled',
              },
            },
            disabled: {
              on: {
                TOGGLE_OSC: 'enabled',
              },
            },
          },
        },
        history: {
          type: 'history',
          history: 'deep',
        },
      },
    },
  },
})
