import { ExerciseCard } from "@components/ExerciseCard"
import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { Loading } from "@components/Loading"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { useCallback, useEffect, useState } from "react"
import { View, FlatList, Text } from "react-native"
import Toast from "react-native-root-toast"

export function Home() {
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups')
      setGroups(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares."
      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      })
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      console.log(response.data)

      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível carregar os exercícios."
      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

  return (
    <View className="flex-1 bg-gray-700">
      <HomeHeader />

      <FlatList
        className="my-10 max-h-10 min-h-10"
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setGroupSelected(item)}
            isActive={
              groupSelected.toLocaleUpperCase() 
              === item.toLocaleUpperCase()
            }
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
          columnGap: 4,
        }}
      />

      {
        isLoading ?
          <Loading /> :
          (
            <View className="px-8">
              <View className="flex-row justify-between mb-5">
                <Text className="text-gray-200 text-md font-heading">
                  Exercícios
                </Text>

                <Text className="text-gray-200 text-sm">
                  {exercises.length}
                </Text>
              </View>


              <FlatList
                data={exercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ExerciseCard
                    onPress={() => handleOpenExerciseDetails(item.id)}
                    data={item}
                  />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 20
                }}
              />
            </View>
          )
    }
    </View>
  )
}