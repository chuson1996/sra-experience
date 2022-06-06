import { createMachine, assign } from 'xstate';

const authMachine = createMachine<{
  user: any
}>({
  id: 'auth',
  context: {
    user: null
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        CHECK_AUTH: 'loading'
      }
    },
    loading: {
      on: {
        LOGGED_IN: 'logged_in',
        NOT_LOGGED_IN: 'not_logged_in'
      }
    },
    logged_in: {
      on: {
        GET_SCORE: 'loading_score',
      }
    },
    loading_score: {
      on: {
        SUCCESS: 'load_score_success',
        FAIL: 'load_score_fail'
      }
    },
    load_score_fail: {
      on: {
        RETRY: {
          target: 'loading_score'
        }
      }
    },
    load_score_success: {},
    not_logged_in: {
      on: {
        LOGIN: {
          target: 'loading',
        }
      }
    }
  }
})