import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { useState } from "react"
import { View, SectionList, Text } from "react-native"

export function History() {
  const [exercises, setExercises] = useState([{
    title: "26.08.24",
    data: ['puxada frontal', 'remada unilateral']
  },
  {
    title: "27.08.24",
    data: ['puxada frontal']
  }
])

  return (
    <View className="flex-1 bg-gray-700">
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View className="px-8">
            <HistoryCard />
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text className="text-gray-200 text-md font-heading mt-10 mb-3 px-8">
            {section.title}
          </Text>
        )}
        contentContainerStyle={exercises.length === 0 && {
          flex: 1,
          justifyContent: "center",
        }}
        ListEmptyComponent={() => (
          <Text className="text-gray-100 text-center">
            Não há exercícios registrados ainda.
            {'\n'}
            Vamos treinar hoje?
          </Text>
        )}
      />
    </View>
  )
}