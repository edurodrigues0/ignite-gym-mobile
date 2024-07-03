import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  if(isLoadingUserStorageData) {
    return (
      <Loading />
    )
  }

  return (
    <NavigationContainer>
      {!user?.id ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  )
}