import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user } = useAuth()

  console.log(user)

  return (
    <NavigationContainer>
      {!user?.id ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  )
}