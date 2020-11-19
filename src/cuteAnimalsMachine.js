const fetchCuteAnimals = () => {
  return fetch('https://www.reddit.com/r/aww.json')
    .then((res) => res.json())
    .then((data) => data.data.children.map((child) => child.data))
}

const cuteAnimalsMachine = Machine({
  id: 'cuteAnimals',
  initial: 'idle',
  context: { cuteAnimals: null, error: null },
  states: {
    idle: { on: { FETCH: 'loading' } },
    success: { type: 'final' },
    failure: { on: { RETRY: 'loading' } },
    loading: {
      invoke: {
        id: 'fetchCuteAnimals',
        src: fetchCuteAnimals,
        onDone: {
          target: 'success',
          actions: assign({ cuteAnimals: (context, event) => event.data }),
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (context, event) => event.data }),
        },
      },
    },
  },
})
