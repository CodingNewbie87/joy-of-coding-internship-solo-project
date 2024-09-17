import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'

const createTaskSchema = z.object({
name: z.string().min(1, 'task name is required').max(255),
description: z.string().min(1, 'description is required').max(255),
date: z.string().min(1, 'due date is required').max(255)
})



export async function POST(request: NextRequest){
  const body = await request.json()
  const validation = createTaskSchema.safeParse(body)
if (!validation.success)
    return NextResponse.json(validation.error.format(), {status: 400})

const newTask = await prisma.task.create({
    data: {name: body.name, 
        description: body.description, 
        date: body.date}
})

return NextResponse.json(newTask, {status: 201})
}
