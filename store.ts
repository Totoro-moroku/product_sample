import create from 'zustand'
import { EditedTask, EditedComment } from './types/types'

type State = {
  editedTask: EditedTask
  editedComment: EditedComment
  updateEditedTask: (payload: EditedTask) => void
  updateEditedComment: (payload: EditedComment) => void
  resetEditedTask: () => void
  resetEditedComment: () => void
}

const useStore = create<State>((set, _) => ({
  editedTask: { id: '', title: '', content: '' },
  editedComment: { id: '', content: '' },
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      },
    }),
  resetEditedTask: () =>
    set({ editedTask: { id: '', title: '', content: '' } }),
  updateEditedComment: (payload) =>
    set({
      editedComment: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedComment: () => set({ editedComment: { id: '', content: '' } }),
}))
export default useStore
