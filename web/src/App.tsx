//Utilizando css modules para escopar os estilos
import { useContext } from 'react';
import styles from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './context/auth';
/*
  Exportando como "named export" para facilitar a manutenabildiade futura da aplicação
  export default permite que seja importado com qualquer nome
*/
export function App() {

  const {user} = useContext(AuthContext)
  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}

