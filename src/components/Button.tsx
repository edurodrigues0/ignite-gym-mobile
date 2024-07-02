import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

const buttonStyle = {
  default: 'bg-green-700 border-0 active:bg-green-500/90 disabled:bg-green-700/50',
  outline: 'bg-transparent border border-green-500 active:bg-gray-500/90'
}

const textStyle = {
  default: 'text-white',
  outline: 'text-green-500'
}

type Props = TouchableOpacityProps & {
  title: string
  variant?: 'default' | 'outline'
}

export function Button({ title, variant = 'default', ...rest }: Props) {
  return (
    <TouchableOpacity
      className={`w-full h-14 flex items-center justify-center rounded ${buttonStyle[variant]}`}
      activeOpacity={1}
      {...rest}
    >
      <Text className={`text-sm font-heading ${textStyle[variant]}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}