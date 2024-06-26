import { View, Image, Text, ScrollView } from "react-native";

import LogoSvg from '../../assets/logo.svg'
import BackgroundImg from '../../assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from 'react-hook-form'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

export function SignUp() {
  const { control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp (data: FormDataProps) {
    console.log({data})
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
            rules={{
              required: 'Informe o nome'
            }}
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
            rules={{
              required: 'Informe o e-mail',
              pattern: {
                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido'
              }
            }}
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
            rules={{
              required: 'Informe a senha',
              minLength: 6,
            }}
            render={({ field: { onChange, value }}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Senha"
                secureTextEntry
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
          />
        </View>
      </View>
    </ScrollView>
  )
}