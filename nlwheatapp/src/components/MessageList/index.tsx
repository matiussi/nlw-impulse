import React from 'react';
import { ScrollView } from 'react-native';

import {Message} from '../Message'

import { styles } from './styles';

export function MessageList() {

   const message = {
      id: '1',
      text: 'mensagem legal',
      user:{
         name: 'user',
         avatar_url: 'https://github.com/matiussi.png'
      }
   }

   return (
      <ScrollView 
      style={styles.container}
      // É possível estilizar o conteúdo de uma scrollview através da propriedade:
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
      >
         <Message data={message}/>
      </ScrollView>
   );
}