import { View, Text } from "react-native"

export function HistoryCard() {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 mb-3 bg-gray-600 rounded-md">
      <View className="mr-5 flex-1">
        <Text className="text-white text-md capitalize line-clamp-1">
          Costas
        </Text>

        <Text className="text-gray-100 text-lg line-clamp-1">
          Puxada frontal
        </Text>
      </View>

      <Text className="text-gray-300 text-md">
        08:56
      </Text>
    </View>
  )
}