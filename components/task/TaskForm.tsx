import { FC, FormEvent, ReactNode } from 'react'
import { supabase } from '../../utils/supabase'
import useStore from '../../store'
import { useMutateTask } from '../../hooks/useMutateTask'
import { Spinner } from '../other/Spinner'

export const TaskForm: FC = () => {
  const { editedTask } = useStore()
  const update = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '')
      createTaskMutation.mutate({
        title: editedTask.title,
        content: editedTask.content,
        user_id: supabase.auth.user()?.id,
      })
    else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
        content: editedTask.content,
      })
    }
  }

  if (updateTaskMutation.isLoading || createTaskMutation.isLoading) {
    return <Spinner />
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="title"
          value={editedTask.title}
          onChange={(e) => update({ ...editedTask, title: e.target.value })}
        />
      </div>
      <div>
        <textarea
          cols={50}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="content"
          value={editedTask.content}
          onChange={(e) => update({ ...editedTask, content: e.target.value })}
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          type="submit"
          className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {editedTask.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
