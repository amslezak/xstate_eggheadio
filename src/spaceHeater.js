const spaceHeater = Machine({
  id: 'spaceHeater',
  initial: 'poweredOff',
  states: {
    poweredOff: {
      on: { TOGGLE_POWER: 'poweredOn' },
    },
    poweredOn: {
      on: { TOGGLE_POWER: 'poweredOff' },
      type: 'parallel',
      states: {
        heated: {
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
            disabled: {
              on: { TOGGLE_OSCILLATION: 'enabled' },
            },
            enabled: {
              on: { TOGGLE_OSCILLATION: 'disabled' },
            },
          },
        },
      },
    },
  },
})
