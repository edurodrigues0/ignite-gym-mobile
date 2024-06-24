import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native"
import { Feather } from '@expo/vector-icons'
import colors from "../theme/colors"
import { useNavigation } from "@react-navigation/native"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import BodySvg from "../../assets/body.svg"
import SerieSvg from "../../assets/series.svg"
import RepetitionsSvg from "../../assets/repetitions.svg"
import { Button } from "@components/Button"

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.navigate("home")
  }

  return (
    <View className="bg-gray-700 flex-1">
      <View className="px-8 pt-12 bg-gray-600">
        <TouchableOpacity className="mb-4" onPress={handleGoBack}>
          <Feather
            name="arrow-left"
            color={colors.green[500]}
            size={24}
          />
        </TouchableOpacity>

        <View className="mb-8 flex-row items-center justify-between">
          <Text className="text-gray-100 text-lg shrink">
            Puxada frontal
          </Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-gray-200 ml-1 capitalize">
              Costas
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{
        paddingBottom: 56
      }}>
        <View className="p-8">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ832OtwhDiUlpQkmINPlWhjBcIrldMd7YGgA&s"
            }}
            alt="Imagem do exercicio"
            width={240}
            height={240}
            className="w-full h-80 mb-3 object-cover rounded-lg"
          />

          <View className="bg-gray-600 rounded-md pb-4 px-4 mt-2">
            <View className="flex-row items-center justify-around mb-6 mt-5">
              <View className="flex-row">
                <SerieSvg />
                <Text className="text-gray-200 ml-2">
                  3 series
                </Text>
              </View>

              <View className="flex-row">
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2">
                  12 repeticoes
                </Text>
              </View>
            </View>

            <Button
              title="Marcar como realizado"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}