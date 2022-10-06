import { Mint } from '../components/Mint'
import { Nav } from '../components/Nav'

export default function Home() {

  return (
    <div>
      <Nav mint={true} />
          <Mint />
    </div>

  )
}