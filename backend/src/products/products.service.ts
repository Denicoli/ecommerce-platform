import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { EXTERNAL_APIS } from 'src/config/external-apis';
import { NormalizedProduct } from './interfaces/product-source.interface';
import { Decimal } from '@prisma/client/runtime/library';

interface ApiBrProduct {
  id: string;
  nome: string;
  descricao?: string;
  categoria?: string;
  imagem?: string;
  preco?: number;
  material?: string;
  departamento?: string;
}

interface ApiEuProduct {
  id: string;
  name: string;
  description?: string;
  details?: {
    adjective?: string;
    material?: string;
  };
  image?: string;
  gallery?: string[];
  price?: number;
  discountValue?: number;
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async syncProducts(): Promise<void> {
    try {
      const [brRes, euRes] = await Promise.all([
        axios.get(EXTERNAL_APIS.BRAZILIAN_PROVIDER.BASE_URL),
        axios.get(EXTERNAL_APIS.EUROPEAN_PROVIDER.BASE_URL),
      ]);

      const products: NormalizedProduct[] = [
        ...this.normalizeApiBr(brRes.data, 'API_BR'),
        ...this.normalizeApiEu(euRes.data, 'API_EU'),
      ];

      const upserts = products.map((product) =>
        this.prisma.product.upsert({
          where: {
            externalId_source: {
              externalId: product.externalId,
              source: product.source,
            },
          },
          update: product,
          create: product,
        }),
      );

      await Promise.allSettled(upserts);

      this.logger.log(`[SYNC] ${products.length} products synchronized successfully.`);
    } catch (error) {
      this.logger.error('Error synchronizing products:', error);
      throw new Error('Failed to synchronize products');
    }
  }

  private convertPlaceimgToPlacehold(url: string): string {
    const regex = /https?:\/\/placeimg\.com\/640\/480\/(.+)/i;
    const match = url?.match?.(regex);
    if (match && match[1]) {
      return `https://placehold.co/640x480?text=${encodeURIComponent(match[1])}`;
    }
    return url;
  }

  private normalizeApiBr(data: ApiBrProduct[], source: 'API_BR'): NormalizedProduct[] {
    return data.map((item) => {
      const imageUrl = this.convertPlaceimgToPlacehold(item.imagem ?? '');
      return {
        externalId: item.id,
        source,
        name: item.nome,
        description: item.descricao ?? '',
        category: item.categoria ?? '',
        image: imageUrl,
        gallery: item.imagem ? [imageUrl] : [],
        price: item.preco ?? 0,
        discount: null,
        material: item.material ?? '',
        department: item.departamento ?? '',
      };
    });
  }

  private normalizeApiEu(data: ApiEuProduct[], source: 'API_EU'): NormalizedProduct[] {
    return data.map((item) => {
      const gallery = Array.isArray(item.gallery)
        ? item.gallery.map((img: string) => this.convertPlaceimgToPlacehold(img))
        : [];
      const imageUrl = gallery[0] ?? this.convertPlaceimgToPlacehold(item.image ?? '');
      return {
        externalId: item.id,
        source,
        name: item.name,
        description: item.description ?? '',
        category: item.details?.adjective ?? '',
        image: imageUrl,
        gallery,
        price: item.price ?? 0,
        discount: item.discountValue ? item.discountValue : null,
        material: item.details?.material ?? '',
        department: '',
      };
    });
  }

  async findAll(query: any): Promise<NormalizedProduct[]> {
    const { name, category, minPrice, maxPrice } = query;

    const products = await this.prisma.product.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        category: category || undefined,
        price: {
          gte: minPrice ? new Decimal(minPrice) : undefined,
          lte: maxPrice ? new Decimal(maxPrice) : undefined,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
      discount: product.discount ? product.discount.toNumber() : null,
    }));
  }

  async findOne(id: string): Promise<NormalizedProduct | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return {
      ...product,
      price: product.price.toNumber(),
      discount: product.discount ? product.discount.toNumber() : null,
    };
  }
}
