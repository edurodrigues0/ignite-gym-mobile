import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO"
import { useFocusEffect } from "@react-navigation/native"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { AppToast } from "@utils/AppToast"
import { useCallback, useState } from "react"
import { View, SectionList, Text } from "react-native"

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const response = await api.get('/history')
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível carregar o histórico de exercícios."
      AppToast(title, "TOP")
    } finally {
      setIsLoading(false)
    }  
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))

  return (
    <View className="flex-1 bg-gray-700">
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="px-8">
            <HistoryCard
              data={item}
            />
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