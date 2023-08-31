
import { Progress } from 'antd';
import { red, green } from '@ant-design/colors';

export default () => {
  return <Progress className={'custom_progress'} percent={60} steps={3} strokeColor={[green[6], green[6], red[5]]} />

}