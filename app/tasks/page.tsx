import { Button, Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { Status, Task } from '@prisma/client'
import NextLink from 'next/link'
import Link from 'next/link'


const TasksPage = async ({
   searchParams }: {searchParams: { status: Status, orderBy: keyof Task }}) => {

    const columns: {
       label: string;
       value: keyof Task;
       className?: string
      }[] = [
      { label: 'Task', value: 'name', className:'mb-3'},
      { label: 'Description', value: 'description', className:'mb-3'},
      { label: 'Due Date ', value: 'date', className:'mb-3'}
    ]
    const statuses= Object.values(Status)
    ? searchParams.status
    : undefined
    console.log(statuses)

const orderBy = columns.map(column=>column.value)
.includes(searchParams.orderBy)
?{[searchParams.orderBy]: 'asc'}
: undefined;

const tasks = await prisma.task.findMany({
  orderBy
})

  return (
     <>
      <Table.Root className='mb-3' variant='surface'>
        <Table.Header>
          <Table.Row>
            { columns.map(column => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink href={{
                  query: {...searchParams, orderBy: column.value}
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy}
                
                </Table.ColumnHeaderCell>
            ))}
            
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map(task => (
            <Table.Row key={task.id}>
              <Table.Cell><Link href={`/tasks/${task.id}`} className='text-blue-800 hover:underline'>{task.name}</Link></Table.Cell>
              <Table.Cell>{task.description}</Table.Cell>
              <Table.Cell>{task.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button className='flex'>
        <Link href='/tasks/new'>Add Task</Link>
      </Button>
     
      </>
 
  )
}

export const dynamic = 'force-dynamic'


export default TasksPage
