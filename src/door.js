const door = Machine({
  id: 'door',
  initial: 'locked',
  states: {
    locked: {
      id: 'locked',
      on: {
        UNLOCK: 'unlocked',
      },
    },
    unlocked: {
      initial: 'closed',
      states: {
        closed: {
          on: {
            OPEN: 'opened',
            // LOCK: '#door.locked',
            LOCK: '#locked',
          },
        },
        opened: {
          on: {
            CLOSE: 'closed',
          },
        },
      },
    },
  },
})
