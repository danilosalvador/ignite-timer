import { createContext, ReactNode, useReducer, useState } from "react";

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishDate?: Date
}

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
    markCurrentCycleAsFinished: () => void
    updateSecondsPassed: (seconds: number) => void
  }

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        
        if (action.type === 'ADD_NEW_CYCLE') {
            return [
                ...state,
                action.payload.newCycle
            ]
        }

        return state
    }, [])

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'FINISH_CURRENT_CYCLE',
            payload: {
                activeCycleId,
            },
        })
      }
    
    function updateSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {    
        const newCycle: Cycle = {
          id: String(new Date().getTime()),
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            },
        })
    
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
      }
    
      function interruptCurrentCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId,
            },
        })
        setActiveCycleId(null)
      }

    return (
        <CyclesContext.Provider
          value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            markCurrentCycleAsFinished,
            updateSecondsPassed,
          }}
        >
            {children}
        </CyclesContext.Provider>
    )
}