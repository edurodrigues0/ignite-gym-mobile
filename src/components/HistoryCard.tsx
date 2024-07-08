import { HistoryDTO } from "@dtos/HistoryDTO"
import { View, Text } from "react-native"

type HistoryCardProps = {
  data: HistoryDTO
}

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 mb-3 bg-gray-600 rounded-md">
      <View className="mr-5 flex-1">
        <Text className="text-white text-md  font-heading capitalize line-clamp-1">
          {data.group}
        </Text>

        <Text className="text-gray-100 text-lg line-clamp-1">
          {data.name}
        </Text>
      </View>

      <Text className="text-gray-300 text-md">
        {data.hour}
      </Text>
    </View>
  )
}