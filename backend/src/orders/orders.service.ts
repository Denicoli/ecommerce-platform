import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, dto: CreateOrderDto) {
        if (!dto.products || !Array.isArray(dto.products) || dto.products.length === 0) {
            throw new BadRequestException('Order must contain at least one product');
        }

        const products = await this.prisma.product.findMany({
            where: {
                id: { in: dto.products.map(p => p.productId) },
            },
        });

        const total = products.reduce((sum, product) => {
            const qty = dto.products.find(p => p.productId === product.id)?.quantity || 0;
            return sum.add(product.price.mul(qty));
        }, new Decimal(0));

        const order = await this.prisma.order.create({
            data: {
                userId,
                total,
            },
        });

        await this.prisma.orderProduct.createMany({
            data: dto.products.map(p => ({
                orderId: order.id,
                productId: p.productId,
                quantity: p.quantity,
            })),
        });

        return this.prisma.order.findUnique({
            where: { id: order.id },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });
    }

    async findAllByUser(userId: string) {
        const orders = await this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return orders.map(order => ({
            ...order,
            total: order.total.toString(),
        }));
    }
}
