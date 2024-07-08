import Toast from "react-native-root-toast";

type Positions = 'TOP' | 'BOTTOM' | 'CENTER'

export function AppToast(title: string, position: Positions) {
  return Toast.show(title, {
    duration: Toast.durations.LONG,
    position: Toast.positions[position]
  })
}