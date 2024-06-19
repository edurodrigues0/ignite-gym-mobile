import { TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps & {}

export function Input({...rest}: Props) {
  return (
    <TextInput 
      className='bg-gray-700 w-full h-14 px-4 rounded text-md text-white font-body mb-4 placeholder:text-gray-300 focus:bg-gray-700 focus:border focus:border-green-500'
      {...rest}
    />
  )
}