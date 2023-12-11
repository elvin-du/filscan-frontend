import { useEffect } from 'react'
import KChart from './KChart'
import analysisStore from '@/store/modules/analysis'

export default () => {
  useEffect(() => {
    analysisStore.getData()
  }, [])
  return (
    <div>
      <KChart />
    </div>
  )
}
