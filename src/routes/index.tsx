import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}