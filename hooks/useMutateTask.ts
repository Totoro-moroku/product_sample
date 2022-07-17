import { useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { revalidateList, revalidateSingle } from '../utils/revalidation'
import { Task, EditedTask } from '../types/types'

export const useMutateTask = () => {
  const reset = useStore((state) => state.resetEditedTask)
  const createTaskMutation = useMutation(
    async (
      task: Omit<Task, 'id' | 'created_at' | 'comments' | 'manage_user_id'>
    ) => {
      const { data, error } = await supabase.from('tasks').insert(task)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        // revalidateList()
        reset()
        alert('Successfully completed !!')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: task.title, content: task.content })
        .eq('id', task.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        // revalidateList()
        revalidateSingle(res[0].id)
        reset()
        // alert('Successfully completed !!')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('tasks').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        // revalidateList()
        reset()
        // alert('Successfully completed !!')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return { deleteTaskMutation, updateTaskMutation, createTaskMutation }
}
