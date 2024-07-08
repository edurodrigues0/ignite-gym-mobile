import { 
  TouchableOpacity,
  TouchableHighlightProps,
  Text,
  View,
  Image,
} from "react-native"
import { Entypo } from "@expo/vector-icons"

import colors from 'tailwindcss/colors'
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { api } from "@services/api"

type Props = TouchableHighlightProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: Props) {
  console.log(`${api.defaults.baseURL}/exercises/thumb/${data.thumb}`)
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-500 items-center p-2 pr-4 mb-3 rounded-md">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercises/thumb/${data.thumb}`
          }}
          alt="Imagem do exercicio"
          width={64}
          height={64}
          className="rounded-md object-cover"
        />

        <View className="flex-1 ml-4">
          <Text className="text-lg text-white font-heading">
            { data.name }
          </Text>

          <Text className="text-sm text-gray-200 mt-1 line-clamp-2">
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </View>

        <Entypo
          name="chevron-thin-right"
          color={colors.gray[300]}
          size={16}
        />
      </View>
    </TouchableOpacity>
  )
}