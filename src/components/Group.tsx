import { Text, Pressable, PressableProps } from "react-native"

type Props = PressableProps & {
  name: string
  isActive?: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
  const isActiveViewStyle = isActive ? "border border-green-500" : ""
  const isActiveTextStyle = isActive ? "text-green-500" : "text-gray-200"
  
  return (
    <Pressable
      className={`w-24 h-10 bg-gray-600 rounded-md justify-center items-center overflow-hidden border active:border active:border-green-500 ${isActiveViewStyle}`}
      {...rest}
    >
      <Text className={`text-xs uppercase font-bold ${isActiveTextStyle}`}>
        {name}
      </Text>
    </Pressable>
  )
}