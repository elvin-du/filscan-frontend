import Image from 'next/image'
import loading from '@/assets/images/loading.png'

export default ({ width, height }: { width?: number; height?: number }) => {
  return (
    <Image src={loading} width={width || 260} height={height || 260} alt="" />
  )
}
