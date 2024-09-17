import { Heading } from '@radix-ui/themes'
import React from 'react'
import TaskForm from '../_components/TaskForm'
import DeleteTaskButton from './DeleteTaskButton'
import { Task } from '@prisma/client'


const TaskDetails = ({task}:{task: Task}) => {
  return (
    <>
    <Heading className='mb-3'>{task.name}</Heading>
    <TaskForm task={task}/>
    <DeleteTaskButton taskId={task.id}/>
  </>
  )
}

export default TaskDetails
