import { NextPage } from 'next'
import { DocumentTextIcon, LogoutIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { TaskForm } from '../components/task/TaskForm'
import { TaskItem } from '../components/task/TaskItem'
import { Task } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  console.log('ISR invoked - tasks page')
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) {
    throw new Error(`${error.message}: ${error.details}`)
  }
  return {
    props: { tasks },
    revalidate: false,
  }
}
type StaticProps = {
  tasks: Task[]
}

const Tasks: NextPage<StaticProps> = ({ tasks }) => {
  const signOut = () => {
    const result = window.confirm('本当にいいんですね？')
    if (result) supabase.auth.signOut()
  }
  return (
    <Layout title="Tasks">
      <LogoutIcon
        className=" mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
      <ul className="my-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            content={task.content}
            user_id={task.user_id}
          />
        ))}
      </ul>
      <TaskForm />
    </Layout>
  )
}

export default Tasks
