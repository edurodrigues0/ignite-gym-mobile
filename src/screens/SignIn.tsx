import * as yup from "yup";
import { View, Image, Text, ScrollView } from 'react-native';

import LogoSvg from '../../assets/logo.svg'
import BackgroundImg from '../../assets/background.png'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail Inválido."),
  password: yup.string().required("Informe a senh.").min(6, "A senha deve ter pelo menos 6 dígitos."),
})


export function SignIn() {
  const { control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  })


  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  
  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn (data: FormDataProps) {
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
          <Text className="text-gray-100 text-sm">Treine sua mente e o seu corpo</Text>
        </View>

        <View className="w-full flex flex-col items-center justify-center">
          <Text className="text-gray-100 font-heading text-xl mb-6">
            Acesse sua conta
          </Text>

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

          <Button
            onPress={handleSubmit(handleSignIn)}
            title="Acessar"
          />
        </View>
        
        <Text className="text-gray-100 text-sm font-body mx-auto mt-24 mb-3">
          Ainda não tem acesso?
        </Text>

        <Button
          title="Criar conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </View>
    </ScrollView>
  )
}