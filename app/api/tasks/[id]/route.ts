import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { TaskSchema } from "@/app/validationSchemas";


export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string }}) {
const body = await request.json()
const validation = TaskSchema.safeParse(body)
if(!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })    

const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id)}
    })
if (!task)
    return NextResponse.json({ error: 'Task Not Found'}, { status: 404 })

const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: {
        name: body.name,
        description: body.description,
        date: body.date
    }
})

return NextResponse.json(updatedTask)
}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: { id: string }}) {

        const task = await prisma.task.findUnique({
            where: { id: parseInt(params.id)}
        })

    if (!task)
            return NextResponse.json ({error: 'Invalid Task'}, {status: 404})
   
   await prisma.task.delete({
    where: { id: task.id }
   })

   return NextResponse.json({})

    }