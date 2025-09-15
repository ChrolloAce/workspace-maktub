import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const updateClientSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url('Valid URL is required').optional().or(z.literal('')),
  primaryContact: z.string().optional(),
  address: z.string().optional(),
  status: z.string().optional(),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = await db.client.findUnique({
      where: { id },
      include: {
        owner: {
          select: { name: true, email: true, image: true },
        },
        accesses: {
          select: {
            id: true,
            type: true,
            label: true,
            username: true,
            verified: true,
            createdAt: true,
          },
        },
        websites: true,
        adAccounts: true,
        projects: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        files: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        notes: {
          include: {
            createdBy: {
              select: { name: true, image: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        deals: {
          orderBy: { createdAt: 'desc' },
        },
        invoices: {
          orderBy: { issueDate: 'desc' },
          take: 10,
        },
        tasks: {
          include: {
            assignee: {
              select: { name: true, image: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            projects: true,
            tasks: true,
            invoices: true,
            files: true,
          },
        },
      },
    })
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateClientSchema.parse(body)
    
    const client = await db.client.update({
      where: { id },
      data: validatedData,
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    })
    
    return NextResponse.json(client)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    
    console.error('Error updating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.client.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
