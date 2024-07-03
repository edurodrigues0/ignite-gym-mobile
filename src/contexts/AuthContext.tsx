import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO | undefined
  signIn: (email: string, password: string) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }
  
  return (
    <AuthContext.Provider value={{ user, signIn }}>
      { children }
    </AuthContext.Provider>
  )
}