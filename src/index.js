const { Machine, interpret } = require('xstate')

const lit = {
  on: {
    BREAK: 'broken',
    TOGGLE: 'unlit',
  },
}

const unlit = {
  on: {
    BREAK: 'broken',
    TOGGLE: 'lit',
  },
}

const broken = {
  //   type: 'final',
}

const states = { lit, unlit, broken }

const initial = 'unlit'

const config = {
  id: 'lightBulb',
  initial,
  states,
  strict: true,
}

const lightBulbMachine = Machine(config)

console.log(lightBulbMachine.transition('unlit', 'TOGGLE').value)
console.log(lightBulbMachine.transition('lit', 'TOGGLE').value)
console.log(lightBulbMachine.transition('broken', 'TOGGLE').value)
console.log(lightBulbMachine.transition('lit', 'TOGGLE').value)
// console.log(lightBulbMachine.transition('', 'FOO').value)

const service = interpret(lightBulbMachine).start()

service.onTransition((state) => {
  if (state.matches('broken')) {
    console.log(state.value)
  }
})

// const nextState = service.send("TOGGLE")
service.send('TOGGLE')
service.send('TOGGLE')
service.send('TOGGLE')
service.send('BREAK')
service.send('BREAK')
// service.send('BREAK') //?

// console.log(service.state.value)
service.state.value //?
