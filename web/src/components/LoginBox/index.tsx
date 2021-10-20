import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';

/**
 * Ao clicar no botão usuário será redirecionado ao github
 * login será realizado
 * github irá redirecionar de volta à aplicação
 */
export function LoginBox(){

  const{ signInUrl} = useContext(AuthContext)

   return ( 
      <div className={styles.loginBoxWrapper}>
         <strong>Entre e compartilhe sua mensagem</strong>
         <a href={signInUrl} className={styles.signInWithGithub}>
            <VscGithubInverted size="24" />
            Entrar com Github
         </a>
      </div>
    );
}
 
