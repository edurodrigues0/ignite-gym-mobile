import { ExerciseCard } from "@components/ExerciseCard"
import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { useEffect, useState } from "react"
import { View, FlatList, Text } from "react-native"
import Toast from "react-native-root-toast"

export function Home() {
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Rosca polia alta'])
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState('costas')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
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

  useEffect(() => {
    fetchGroups()
  }, [])

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
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
              exercise={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20
          }}
        />
      </View>
    </View>
  )
}