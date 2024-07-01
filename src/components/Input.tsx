import { View, Text, TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  bg?: string;
  errorMessage?: string | null
  isInvalid?: boolean
}

export function Input({errorMessage, isInvalid, bg = "bg-gray-700", ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <View className='mb-4 w-full flex-col gap-1'>
      <TextInput
        className={`w-full h-14 px-4 rounded text-md text-white font-body placeholder:text-gray-300 focus:bg-gray-700 focus:border focus:border-green-500 ${bg}`}
        {...rest}
      />

      <Text className='text-red-600'>
        {errorMessage}
      </Text>
    </View>
  )
}