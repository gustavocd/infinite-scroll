import { createMachine, assign } from 'xstate'

const scrollMachine = createMachine({
  id: 'scrollMachine',
  context: {
    characters: [],
    pageInfo: {},
    error: '',
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: {
          target: 'loading',
        },
      },
    },
    loading: {
      invoke: {
        id: 'characters',
        src: 'fetchCharacters',
        onDone: {
          target: 'success',
          actions: 'setCharacters',
        },
        onError: {
          target: 'failure',
          actions: 'setError',
        },
      },
    },
    loadMore: {
      invoke: {
        src: 'fetchCharacters',
        onDone: {
          target: 'success',
          actions: 'setMoreCharacters',
        },
        onError: {
          target: 'failure',
          actions: 'setError',
        },
      },
    },
    success: {
      on: {
        FETCH_MORE: {
          target: 'loadMore',
          cond: 'hasMoreCharacters',
        },
      },
    },
    failure: {
      type: 'final',
    },
  },
}, {
  guards: {
    hasMoreCharacters: ({ pageInfo }) => pageInfo.next,
  },
  actions: {
    setCharacters: assign({
      characters: (_, event) => event.data.characters,
      pageInfo: (_, event) => event.data.info,
    }),
    setMoreCharacters: assign({
      characters: ({ characters }, { data }) => [...characters, ...data.characters],
      pageInfo: (_, { data }) => data.info,
    }),
    setError: assign({
      error: (_, event) => event.data,
    }),
  },
})

export default scrollMachine
