import { View} from "react-native"
import { AntDesign } from '@expo/vector-icons';

export function Loading() {
  return (
    <View className="flex flex-1 items-center justify-center bg-gray-700">
      <AntDesign name="loading1" size={32} color="#00B37E" />
    </View>
  )
}