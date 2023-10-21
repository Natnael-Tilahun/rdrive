import { Player } from '@lottiefiles/react-lottie-player'
import { LoadMore, Loader } from '../utils/LottieUrl'

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-10 dark:text-white">
      <Player autoplay loop src={Loader} style={{ height: '384px', width: '384px'}} ></Player>
    </div>
  )
}

// As there is no CSS-in-JS styling system, pass class list to override styles
export const LoadingIcon = () => {
  return (
    <Player autoplay loop src={LoadMore} style={{ height: '40px', width: '40px'}} ></Player>
  )
}

export default Loading
