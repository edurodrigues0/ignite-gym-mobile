import { View, Text } from "react-native"

type Props = {
  title: string
}

export function ScreenHeader({ title }: Props) {
  return (
    <View className="items-center justify-center bg-gray-600 pb-6 pt-16">
      <Text className="text-gray-100 text-xl font-heading">
        {title}
      </Text>
    </View>
  )
}