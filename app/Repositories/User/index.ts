import Store from './Create'
import Fetch from './Fetch'

const UserRepository = {
  store: Store.store,
  confirmAccount: Store.confirmAccount,
  getProfile: Fetch.getProfile,
}

export default UserRepository
