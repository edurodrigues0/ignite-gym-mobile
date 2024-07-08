import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native"

import { Feather } from '@expo/vector-icons'
import { Button } from "@components/Button"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AppError } from "@utils/AppError"
import { api } from "@services/api"

import colors from "../theme/colors"
import Toast from "react-native-root-toast"

import BodySvg from "../../assets/body.svg"
import SerieSvg from "../../assets/series.svg"
import RepetitionsSvg from "../../assets/repetitions.svg"
import { useEffect, useState } from "react"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { Loading } from "@components/Loading"

type RoutesParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)
  const [sendingRegister, setSendingRegister] = useState(false)


  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { exerciseId } = route.params as RoutesParamsProps

  function handleGoBack() {
    navigation.navigate("home")
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercicio."
      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExercisesHistoryRegister() {
    try {
      setSendingRegister(true)

      await api.post('/history', { exercise_id: exerciseId })

      Toast.show("Parabéns! Exercício registrado no seu histórico.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      })

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível registrar o exercício."
      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      })
    } finally {
      setSendingRegister(false)
    }  
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

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
          <Text className="text-gray-100 text-lg font-heading shrink">
            {exercise.name}
          </Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-gray-200 ml-1 capitalize">
              {exercise.group}
            </Text>
          </View>
        </View>
      </View>

      { 
        isLoading ? 
        <Loading /> :
        <ScrollView contentContainerStyle={{
          paddingBottom: 56
        }}>
          <View className="p-8">
            <View className="rounded-lg mb-3 overflow-hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercises/demo/${exercise.demo}`
                }}
                alt="Imagem do exercicio"
                width={240}
                height={240}
                className="w-full h-80 object-cover rounded-lg"
              />
            </View>

            <View className="bg-gray-600 rounded-md pb-4 px-4 mt-2">
              <View className="flex-row items-center justify-around mb-6 mt-5">
                <View className="flex-row">
                  <SerieSvg />
                  <Text className="text-gray-200 ml-2">
                    {exercise.series} series
                  </Text>
                </View>

                <View className="flex-row">
                  <RepetitionsSvg />
                  <Text className="text-gray-200 ml-2">
                    {exercise.repetitions} repeticoes
                  </Text>
                </View>
              </View>

              <Button
                title="Marcar como realizado"
                disabled={sendingRegister}
                onPress={handleExercisesHistoryRegister}
              />
            </View>
          </View>
        </ScrollView>
      }
    </View>
  )
}