import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url('Valid URL is required').optional().or(z.literal('')),
  primaryContact: z.string().optional(),
  address: z.string().optional(),
  status: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    
    const skip = (page - 1) * limit
    
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { company: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}
    
    const [clients, total] = await Promise.all([
      db.client.findMany({
        where,
        include: {
          owner: {
            select: { name: true, email: true },
          },
          _count: {
            select: {
              projects: true,
              tasks: true,
              invoices: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.client.count({ where }),
    ])
    
    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = createClientSchema.parse(body)
    
    // TODO: Get organizationId from session
    const organizationId = 'temp-org-id'
    
    const client = await db.client.create({
      data: {
        ...validatedData,
        organizationId,
      },
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    })
    
    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
