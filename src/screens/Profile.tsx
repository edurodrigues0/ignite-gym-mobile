import { View, ScrollView, TouchableOpacity, Text } from "react-native"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useAuth } from "@hooks/useAuth"
import { yupResolver } from "@hookform/resolvers/yup"

import * as yup from "yup"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-root-toast"
import { api } from "@services/api"
import { AppToast } from "@utils/AppToast"
import { AppError } from "@utils/AppError"

type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  password: 
    yup.string()
    .min(6, "A senha deve ter pelo menos 6 digitos")
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: 
    yup.string()
    .oneOf([yup.ref("password")], "A confirmação da senha não confere.")
    .nullable()
    .transform((value) => !!value ? value : null)
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) => schema.nullable()
        .required("Confirme a senha.")
        .transform((value) => !!value ? value : null)
    })
})

export function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/edurodrigues0.png')
  
  const { user } = useAuth()

  const { control, handleSubmit, formState: { errors } } 
  = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema)
  })

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true)

      await api.put('/users', data)

      AppToast("Perfil atualizado com sucesso", "TOP")
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível atualizar os dados. Tenta novamente mais tarde!"
      AppToast(title, "TOP")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
  
      if(photoSelected.canceled) {
        return
      }

      if(photoSelected.assets[0].uri) {
        const photoSize = photoSelected.assets[0].fileSize

        if(photoSize && (photoSize / 1024 / 1024) > 5) {
          let toast = Toast.show('Essa imagem é muito grande. Escolha uma de até 5MB.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM
          })

          return toast
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
                  uri: userPhoto
                }}
                alt="Foto do usuário"
                size={144}
                className="h-36 w-36"
              />
            )
          }

          <TouchableOpacity
            className="mt-1 mb-7"
            onPress={handleUserPhotoSelect}
          >
            <Text className="text-green-500 text-md font-bold p-1">
              Alterar foto
            </Text>
          </TouchableOpacity>
          
          <Controller
            control={control}
            name="name"
            render={({field: { value, onChange } }) => (
              <Input
                bg="bg-gray-600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({field: { value, onChange } }) => (
              <Input
                bg="bg-gray-600/40"
                placeholder="E-mail"
                editable={false}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View className="px-10 mt-12 mb-9">
          <Text className="text-gray-200 text-md font-heading mb-2">
            Alterar senha
          </Text>
          
          <Controller
            control={control}
            name="old_password"
            render={({field: { onChange } }) => (
              <Input
                bg="bg-gray-600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({field: { onChange } }) => (
              <Input
                bg="bg-gray-600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({field: { onChange } }) => (
              <Input
                bg="bg-gray-600"
                placeholder="Confirme nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <View className="mt-4">
            <Button
              title="Atualizar"
              onPress={handleSubmit(handleProfileUpdate)}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}