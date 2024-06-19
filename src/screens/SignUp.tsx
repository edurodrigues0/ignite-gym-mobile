import { View, Image, Text, ScrollView } from "react-native";

import LogoSvg from '../../assets/logo.svg'
import BackgroundImg from '../../assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
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

          <Input 
            placeholder="Nome"
          />

          <Input 
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input 
            placeholder="Senha"
            secureTextEntry
          />

          <Button title="Criar e acessar" />
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