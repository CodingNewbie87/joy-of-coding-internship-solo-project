import React from 'react'
import { z } from 'zod'

const validationSchema = z.object({
    name: z.string().min(1, 'task name is required').max(255),
    description: z.string().min(1, 'description is required').max(255),
    date: z.string().min(1, 'due date is required').max(255)
    })

export default validationSchema
