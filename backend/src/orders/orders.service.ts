import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, dto: CreateOrderDto) {
        const products = await this.prisma.product.findMany({
            where: {
                id: { in: dto.products.map(p => p.productId) },
            },
        });

        const total = products.reduce((sum, product) => {
            const qty = dto.products.find(p => p.productId === product.id)?.quantity || 0;
            return sum + product.price * qty;
        }, 0);

        const order = await this.prisma.order.create({
            data: {
                userId,
                total,
                products: {
                    create: dto.products.map(p => ({
                        productId: p.productId,
                        quantity: p.quantity,
                    })),
                },
            },
            include: { products: true },
        });

        return order;
    }

    async findAllByUser(userId: string) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                products: {
                    include: { product: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
