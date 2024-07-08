import { View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { UserPhoto } from "./UserPhoto"
import { useAuth } from "@hooks/useAuth"

import colors from "../theme/colors"
import defaultUserPhotoImg from "../../assets/userPhotoDefault.png"

export function HomeHeader() {
  const { user, signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <View className="flex-row items-center bg-gray-600 pt-16 pb-5 px-8">
      <UserPhoto
        size={64}
        source={{
          uri: user.avatar
        }}
        defaultSource={defaultUserPhotoImg}
        alt="Foto do usuario"
        className="mr-4"
      />
      
      <View className="flex-1">
        <Text className="text-gray-100 text-md">Olá,</Text>
        <Text className="text-gray-100 text-md font-heading">{user?.name}</Text>
      </View>

      <TouchableOpacity onPress={() => handleSignOut()}>
        <MaterialIcons
          name="logout"
          color={colors.gray[200]}
          size={24}
        />
      </TouchableOpacity>
    </View>
  )
}