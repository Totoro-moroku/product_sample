import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { supabase } from '../../utils/supabase'
import useStore from '../../store'
import { useMutateTask } from '../../hooks/useMutateTask'
import { Spinner } from '../other/Spinner'
import { Task } from '../../types/types'

export const TaskItem: FC<
  Omit<Task, 'created_at' | 'comments' | 'manage_user_id'>
> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteTaskMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className="my-3">
      <Link href={`/task/${id}`} prefetch={false}>
        <a className="cursor-pointer hover:text-pink-600">{title}</a>
      </Link>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                title: title,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteTaskMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
