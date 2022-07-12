export type Task = {
  id: string
  created_at: string
  title: string
  content: string
  user_id: string | undefined
  manage_user_id: string | undefined
  comments: Comment[]
}
export type Comment = {
  id: string
  content: string
  created_at: string
  task_id: string
  user_id: string | undefined
}
export type EditedTask = Omit<
  Task,
  'created_at' | 'user_id' | 'comments' | 'manage_user_id'
>
export type EditedComment = Omit<Comment, 'created_at' | 'user_id' | 'task_id'>
