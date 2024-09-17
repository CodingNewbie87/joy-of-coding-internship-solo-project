'use client'

import { Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const DeleteTaskButton = ({ taskId }: {taskId: number}) => {
  const router = useRouter()
  
    return (
    <Button color="red" onClick={async() => {
     await axios.delete('/api/tasks/' + taskId)
     router.push('/tasks')
     router.refresh()
    }}>Delete Task</Button>
      
  )
}

export default DeleteTaskButton
