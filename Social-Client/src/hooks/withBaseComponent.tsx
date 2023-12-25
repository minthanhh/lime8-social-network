import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './useRedux'
import IHocProps from 'src/interfaces/hoc.interface'

const withBaseComponent = <P extends IHocProps>(Component: React.ComponentType<P>) => {
  const WrappedComponent: React.FC<P> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return <Component {...props} dispatch={dispatch} navigate={navigate} useSelector={useAppSelector} />
  }

  if (Component.displayName || Component.name) {
    WrappedComponent.displayName = `withBaseComponent(${Component.displayName || Component.name})`
  }

  return WrappedComponent
}

export default withBaseComponent
