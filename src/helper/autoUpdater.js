import { updateFetch } from './fetch'

export const autoUpdate = (state) => {
  state.data.links.forEach((link) => {
    updateFetch(state, link).catch(() => {})
  })

  setTimeout(() => autoUpdate(state), 5000)
}
