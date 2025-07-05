import { Request, Response } from "express"
import { Category } from "@prisma/client"
import { z } from "zod"

import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/app-error"

const { food, transport, services, accommodation, others } = Category

export class RefundsController{
  async index(request: Request, response: Response){
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    })

    const { name, page, perPage } = querySchema.parse(request.query)

    const skip = (page - 1) * perPage
    
    const refunds = await prisma.refund.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    })

    const totalRecords = await prisma.refund.count({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
    })

    const totalPages = Math.ceil(totalRecords / perPage)

    response.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1
      }
    })
  }

  async create(request: Request, response: Response){

    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: "Informe o nome da solicitação" }),
      category: z.enum([food, transport, services, accommodation, others]),
      amount: z.number().positive({ message: "O valor precisa ser maior do que zero" }),
      filename: z.string().min(20)
    })

    const { name, category, amount, filename } = bodySchema.parse(request.body)

    if(!request.user?.id){
      throw new AppError("Não autorizado", 401)
    }

    const refund = await prisma.refund.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user?.id
      }
    })
    
    response.status(201).json(refund)
  }

  async show(request: Request, response: Response){
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const refund = await prisma.refund.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      }
    })
    
    if(!refund){
      throw new AppError("Solicitação não encontrada")
    }

    response.json(refund)
  }
}
