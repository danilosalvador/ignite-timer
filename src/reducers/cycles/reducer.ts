import { produce } from 'immer'

import { ActionTypes } from "./actions"

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     }
      //     return cycle
      //   }),
      //   activeCycleId: null,
      // }
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.FINISH_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //       if (cycle.id === state.activeCycleId) {
      //           return { ...cycle, finishDate: new Date() }
      //       }
      //       return cycle
      //   })
      // }
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}