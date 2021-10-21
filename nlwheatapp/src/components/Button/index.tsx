import React from 'react';

import {
   TouchableOpacity,
   TouchableOpacityProps,
   Text,
   ColorValue,
   ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

//Obtendo as demais props de um touchble opacity através da interface TouchableOpacityProps
type Props = TouchableOpacityProps & {
   title: string;
   color: ColorValue;
   backgroundColor: ColorValue;
   //Extraindo apenas a propriedade name do AntDesign
   icon?: React.ComponentProps<typeof AntDesign>['name'];
   isLoading?: boolean;
}

export function Button({
   title,
   color,
   backgroundColor,
   icon,
   isLoading = false,
   ...rest }: Props) {
   return (
      <TouchableOpacity
         style={[styles.button, { backgroundColor }]}
         //Reduzindo o efeito de fade do touchableOpacity
         activeOpacity={0.7}
         //Desativando o botão após realizar uma requisição
         disabled={isLoading}
         {...rest}
      >
         {isLoading ? <ActivityIndicator color={color} /> :
            <>
               <AntDesign name={icon} size={24} style={styles.icon} />
               <Text style={[styles.title, { color }]}>
                  {title}
               </Text>
            </>
         }
      </TouchableOpacity>
   );
}