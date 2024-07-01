import { ExerciseCard } from "@components/ExerciseCard"
import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useState } from "react"
import { View, FlatList, Text } from "react-native"

const GROUP_LIST = [
  { name: "costas" },
  { name: "ombro" },
  { name: "peito" },
  { name: "bicepts" },
  { name: "perna" },
]

export function Home() {
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Rosca polia alta'])
  const [groups, setGroups] = useState(GROUP_LIST)
  const [groupSelected, setGroupSelected] = useState('costas')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <View className="flex-1 bg-gray-700">
      <HomeHeader />

      <FlatList
        className="my-10 max-h-10 min-h-10"
        data={groups}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Group
            name={item.name}
            onPress={() => setGroupSelected(item.name)}
            isActive={
              groupSelected.toLocaleUpperCase() 
              === item.name.toLocaleUpperCase()
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