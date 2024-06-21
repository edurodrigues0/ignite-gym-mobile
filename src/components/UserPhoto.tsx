import { Image, ImageProps } from 'react-native'

type Props = ImageProps & {
  size: number
  className?: string
}

export function UserPhoto({ size, className, ...rest}: Props) {
  const classStyle = "rounded-full border-2 border-gray-400"
  
  return (
    <Image 
      width={size}
      height={size}
      className={`${classStyle} ${className}`}
      {...rest}
    />
  )
}