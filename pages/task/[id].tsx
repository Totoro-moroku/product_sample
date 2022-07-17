import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { supabase } from '../../utils/supabase'
import { Layout } from '../../components/Layout'
import { CommentForm } from '../../components/comment/CommentForm'
import { CommentItem } from '../../components/comment/CommentItem'
import { Task } from '../../types/types'

const getAllTaskIds = async () => {
  const { data: ids } = await supabase.from('tasks').select('id')
  return ids!.map((id) => {
    return {
      params: {
        id: String(id.id),
      },
    }
  })
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTaskIds()
  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log('ISR invoked - detail page')
  const { data: task } = await supabase
    .from('tasks')
    .select('*, comments(*)')
    .eq('id', ctx.params?.id)
    .single()

  return {
    props: {
      task,
    },
    revalidate: false,
  }
}
type StaticProps = {
  task: Task
}
const TaskPage: NextPage<StaticProps> = ({ task }) => {
  console.log(task)
  return (
    <Layout title="TaskDetail">
      <p className="text-3xl font-semibold text-blue-500">{task.title}</p>
      <div className="m-8 rounded-lg p-4 shadow-lg">
        <p>{task.content}</p>
      </div>
      <ul className="my-2">
        {task.comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            user_id={comment.user_id}
          />
        ))}
      </ul>
      <CommentForm taskId={task?.id} />
      <Link href="/tasks" passHref prefetch={false}>
        <ChevronDoubleLeftIcon className="my-6 h-6 w-6 cursor-pointer text-blue-500" />
      </Link>
    </Layout>
  )
}

export default TaskPage
