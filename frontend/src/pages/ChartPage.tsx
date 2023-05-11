import { Link } from 'react-router-dom'
import { Button } from 'antd'
import PieChart from '../components/PieChart'

export default function ChartPage() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/">
          <Button>Go to homepage</Button>
        </Link>
      </header>
      <PieChart />
    </div>
  )
}
