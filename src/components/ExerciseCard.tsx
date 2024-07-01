import { 
  TouchableOpacity,
  TouchableHighlightProps,
  Text,
  View,
  Image,
} from "react-native"
import { Entypo } from "@expo/vector-icons"

import colors from 'tailwindcss/colors'

type Props = TouchableHighlightProps & {
  exercise: string
}

export function ExerciseCard({ exercise, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-500 items-center p-2 pr-4 mb-3 rounded-md">
        <Image
          source={{
            uri: "https://v4excellencefitness.com.br/wp-content/uploads/2023/05/rosca-21s-capa-1024x739.webp"
          }}
          alt="Imagem do exercicio"
          width={64}
          height={64}
          className="rounded-md object-cover"
        />

        <View className="flex-1 ml-4">
          <Text className="text-lg text-white font-heading">
            { exercise }
          </Text>

          <Text className="text-sm text-gray-200 mt-1 line-clamp-2">
            3 séries x 12 repetições
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