'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type MessageState, createMessagesStore } from '@/stores/messages-store'

export type MessagesStoreApi = ReturnType<typeof createMessagesStore>

export const MessagesStoreContext = createContext<MessagesStoreApi | undefined>(
  undefined,
)

export interface MessagesStoreProviderProps {
  children: ReactNode
}

export const MessagesStoreProvider = ({
  children,
}: MessagesStoreProviderProps) => {
  const storeRef = useRef<MessagesStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createMessagesStore()
  }

  return (
    <MessagesStoreContext.Provider value={storeRef.current}>
      {children}
    </MessagesStoreContext.Provider>
  )
}

export const useMessagesStore = <T,>(
  selector: (store: MessageState) => T,
): T => {
  const messagesStoreContext = useContext(MessagesStoreContext)

  if (!messagesStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(messagesStoreContext, selector)
}
