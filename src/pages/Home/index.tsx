import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import { HandPalm, Play } from 'phosphor-react'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 1 minuto')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number,
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  function handleCreateNewCycle(data: NewCycleFormData) {
    // para pegar as mensagens de erros da validação de campos dos formulários
    const errors = formState.errors
    console.log(errors)

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60) // floor para baixo, ceil para cima, around base 5
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const diffSeconds = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (diffSeconds >= totalSeconds) {
          setCycles((prev) =>
            prev.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishDate: new Date() }
              }

              return cycle
            }),
          )
          setAmountSecondsPassed(totalSeconds)
          setActiveCycleId(null)

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(diffSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  useEffect(() => {
    document.title = !activeCycle ? 'Ignite Timer' : `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
