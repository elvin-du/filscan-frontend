import Market from '@/src/analysis/market'
import style from './index.module.scss'
import Chart from '@/src/analysis/chart'
import Liquidity from '@/src/analysis/liquidity'
import ReleaseList from '@/src/analysis/releaseList'
import Token from '@/src/analysis/token'
import { useEffect, useState } from 'react'
import analysisStore from '@/store/modules/analysis'
import ActiveList from '@/src/analysis/activeList'
import Loading from '@/components/loading'
export default () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    load()
    analysisStore.getNetWork()
    analysisStore.getReleaseDate()
    analysisStore.getTokens()
    analysisStore.getActiveList()
  }, [])

  const load = async () => {
    await analysisStore.getFilBase()
    setLoading(false)
  }

  if (loading) {
    return <Loading width={180} />
  }
  return (
    <div className={`main_contain ${style.market}`}>
      <Market />
      <Chart />
      <Liquidity />
      <ReleaseList />
      <Token />
      <ActiveList />
    </div>
  )
}
