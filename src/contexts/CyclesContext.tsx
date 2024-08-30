import { createContext, ReactNode, useState } from "react";

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
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        setCycles((prev) =>
          prev.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishDate: new Date() }
            }
            return cycle
          }),
        )
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
    
        setCycles((prev) => [...prev, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
    
        //reset()
      }
    
      function interruptCurrentCycle() {
        setCycles((prev) =>
          prev.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            }
    
            return cycle
          }),
        )
    
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