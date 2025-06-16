import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);

    constructor(private readonly prisma: PrismaService) {}

    async syncProducts(): Promise<void> {
        const apiBr = await axios.get('');
        const apiEu = await axios.get('');

        const products = [
            ...this.normalizeApiBr(apiBr.data, 'API_BR'), // API BR
            ...this.normalizeApiEu(apiEu.data, 'API_EU'), // API EU
        ];

        for (const product of products) {
            await this.prisma.product.upsert({
                where: {
                    externalId_source: {
                        externalId: product.externalId,
                        source: product.source,
                    },
                },
                update: product,
                create: product,
            });
        }

        this.logger.log(`${products.length} products synchronized successfully.`);
    }

    private normalizeApiBr(data: any[], source: string) {
        return data.map(item => ({
            externalId: item.id,
            source: source,
            name: item.nome,
            description: item.descricao ?? '',
            category: item.categoria ?? '',
            image: item.imagem ?? '',
            galery: item.imagem ? [item.imagem] : [],
            price: item.preco ?? 0.0,
            discount: null,
            material: item.material ?? '',
            department: item.departamento ?? '',
        }));
    }

    private normalizeApiEu(data: any[], source: string) {
        return data.map(item => ({
            externalId: item.id,
            source: source,
            name: item.name,
            description: item.description ?? '',
            category: item.details?.adjective ?? '',
            image: item.galery?.[0].image_url ?? '',
            gallery: item.galery ?? [],
            price: item.price ?? 0.0,
            discount: item.discount ?? null,
            material: item.details?.material ?? '',
            department: '',
        }));
    }

    async findAll(query: any): Promise<any> {
        const { name, category, minPrice, maxPrice } = query;

        return this.prisma.product.findMany({
            where: {
                name: name ? { contains: name, mode: 'insensitive' } : undefined,
                category: category || undefined,
                price: {
                    gte: minPrice ? parseFloat(minPrice) : undefined,
                    lte: maxPrice ? parseFloat(maxPrice) : undefined,
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async findOne(id: string): Promise<any> {
        return this.prisma.product.findUnique({
            where: { id },
        });
    }
}
