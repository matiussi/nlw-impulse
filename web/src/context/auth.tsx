import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
   id: string
   name: string
   login: string
   avatar_url: string
}
type AuthContextData = {
   user: User | null
   signInUrl: string
   signOut: () => void
}
type AuthProvider = {
   children: ReactNode
}
type AuthResponse ={
   token: string
   user:{
      id: string
      avatar_url: string
      name: string
      login: string
   }
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider(props: AuthProvider){
  
   const [user, setUser] = useState<User | null>(null)

   const signInUrl = `
      https://github.com/login/oauth/authorize?scope=user&client_id=3cf74a893dc340c69a27
   `
   //Enviando o código ao backend para realizar a autenticação do usuário
   async function signIn(githubCode: string){
      const response = await api.post<AuthResponse>('authenticate', {
         code: githubCode
      })
      
      const {token, user} = response.data

      //Salvando o token no histórico do navegador para verificar se o usuário está logado
      localStorage.setItem('@dowhile:token', token)

      api.defaults.headers.common.authorization = `Bearer ${token}`

      setUser(user)
   }

   function signOut(){
      setUser(null)
      localStorage.removeItem('@dowhile:token')
   }

   useEffect(() =>{
      //Obtendo o token do localStore
      const token = localStorage.getItem('@dowhile:token')
      
      if(token){
         //Enviando o token no cabeçalho da requisição
         api.defaults.headers.common.authorization = `Bearer ${token}`

         api.get<User>('profile').then(response =>{
            setUser(response.data)
         })
      }
   }, [])
   useEffect(() => {
      
      //Verificando se a url possuí o código do github
      const url = window.location.href
      const hasGithubCode = url.includes('?code=')

      if(hasGithubCode){
         const [urlWithoutCode, githubCode] = url.split('?code=')

         //Limpando url para não exibir o código
         window.history.pushState({}, '', urlWithoutCode)

         signIn(githubCode)
      }
   }, [])
   return(
      <AuthContext.Provider value={{signInUrl, user, signOut}}>
         {props.children}
      </AuthContext.Provider>
   )
}