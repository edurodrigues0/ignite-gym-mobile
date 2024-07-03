import * as yup from "yup";
import LogoSvg from '../../assets/logo.svg'
import BackgroundImg from '../../assets/background.png'

import { View, Image, Text, ScrollView } from "react-native";
import { useForm, Controller } from 'react-hook-form'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast"

import { api } from "../services/api"
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail").email("E-mail Inválido."),
  password: yup.string().required("Informe a senh.").min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup.string().required("Confirme a senha.").oneOf([yup.ref('password')], 'A confirmação da senha não confere.')
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const { control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  const handleSignUp = async ({ name, email, password }: FormDataProps) => {
    try {
      setIsLoading(true)

      await api.post("/users", { name, email, password })

      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tenta novamente mais tarde.'
            
      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-col flex-1 bg-gray-700 px-10 pb-16">
      <Image
        defaultSource={BackgroundImg}
        source={BackgroundImg}
        alt="Pessoas treinando"
        className="absolute object-contain"
      />

        <View className="mx-auto my-24 flex items-center justify-center">
          <LogoSvg />
          <Text className="text-gray-100 text-sm">
            Treine sua mente e o seu corpo
          </Text>
        </View>

        <View className="w-full flex flex-col items-center justify-center">
          <Text className="text-gray-100 font-heading text-xl mb-6">
            Crie sua conta
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Senha"
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />
          
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value }}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                placeholder="Confime a Senha"
                secureTextEntry
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleSignUp)}
            title="Criar e acessar"
          />
        </View>

        <View className="mt-24">
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBack}
            disabled={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  )
}