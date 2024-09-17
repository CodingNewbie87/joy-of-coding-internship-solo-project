'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {zodResolver} from '@hookform/resolvers/zod'

import {z} from 'zod'
import { Task } from '@prisma/client'

interface TaskFormData{
    name: string;
    description: string,
    date: string
}


const TaskSchema = z.object({
    name: z.string().min(1, 'task name is required').max(255),
    description: z.string().min(1, 'description is required').max(255),
    date: z.string().min(1, 'due date is required').max(255)
    })


const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter()
  const {
    register, handleSubmit} =  useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema)
  })
 
  return (
    <form className='max-w-xl space-y-4 mb-3' 
    onSubmit={handleSubmit(async(data) => {
      if(task)
        await axios.patch('/api/tasks/' + task.id, data)
      else
    await axios.post('/api/tasks', data)
    router.push('/tasks')
    router.refresh()
})}> 
      <TextField.Root  defaultValue={task?.name} placeholder='Task Name'{...register('name')}>
        <TextField.Slot />
      </TextField.Root>
      <TextArea defaultValue={task?.description} placeholder='Task Description'{...register('description')}/>
      <TextField.Root defaultValue={task?.date} placeholder='Due Date'{...register('date')}>
        <TextField.Slot />
      </TextField.Root>
      <Button>{task? 'Update Task': 'Add New Task'} </Button>
      
    </form>
  )
}

export default TaskForm