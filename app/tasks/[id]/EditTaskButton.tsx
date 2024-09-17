import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditTaskButton = ({ taskId }:{ taskId: number}) => {
  return (
    <Button>
    <Link href={`/tasks/${taskId}/edit`}>Edit Task
    </Link></Button>
  )
}

export default EditTaskButton
