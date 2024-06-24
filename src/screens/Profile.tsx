import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { useState } from "react"
import { View, ScrollView, TouchableOpacity, Text } from "react-native"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <View className="flex-1 bg-gray-700">
      <ScreenHeader title="Profile" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 156
        }}
      >
        <View className="items-center mt-6 px-10">
          {
            photoIsLoading ? (
              <View
                className="bg-slate-700 h-36 w-36 rounded-full animate-bounce"
              />
            ) : (
              <UserPhoto
                source={{
                  uri: "https://github.com/edurodrigues0.png"
                }}
                alt="Foto do usuário"
                size={144}
                className="h-36 w-36"
              />
            )
          }

          <TouchableOpacity className="mt-1 mb-7">
            <Text className="text-green-500 text-md font-bold p-1">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="bg-gray-600"
            placeholder="Nome"
          />

          <Input
            bg="bg-gray-600/40"
            placeholder="edurodriguesdev1@gmail.com"
            editable={false}
          />
        </View>

        <View className="px-10 mt-12 mb-9">
          <Text className="text-gray-200 text-md font-heading mb-2">
            Alterar senha
          </Text>

          <Input
            bg="bg-gray-600"
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input
            bg="bg-gray-600"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            bg="bg-gray-600"
            placeholder="Confirme nova senha"
            secureTextEntry
          />

          <View className="mt-4">
            <Button
              title="Atualizar"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}