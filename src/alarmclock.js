const alarmClockMachine = Machine(
  {
    id: 'alarmClock',
    initial: 'idle',
    states: {
      idle: {
        on: {
          ALARM: 'alarming',
        },
      },
      alarming: {
        activities: ['beeping'],
        on: {
          STOP: 'idle',
        },
      },
    },
  },
  {
    activities: {
      beeping: (context, event) => {
        const beep = () => {
          console.log('beep')
        }

        beep()
        const interval = setInterval(beep, 1000)

        return () => clearInterval(interval)
      },
    },
  }
)
