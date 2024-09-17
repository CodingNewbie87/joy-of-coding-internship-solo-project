import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import TaskDetails from './TaskDetails'

interface Props {
    params: { id: string }
}

const TaskDetailPage = async ({ params }: Props) => {
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id)}
    })

    if (!task)
       return notFound()

  return (
 <TaskDetails task={task}/>
  )
}

export default TaskDetailPage
