import { CreateProductDto } from '../models/products.dto';

export function getNewProductSub() {
  const product = new CreateProductDto();
  product.title = 'title98';
  product.imgPath = '/imgPath98';
  product.details = [
    {
      size: 1,
      price: {
        amount: 100,
      },
    },
  ];
  product.description = 'description98';
  return product;
}

export function findOneProductSub(params: {
  where: Pick<CreateProductDto, 'title'>;
}) {
  const products = [1, 2].map((id) => {
    // product structure isn't correct
    const product = new CreateProductDto();
    product.title = 'title' + id;
    product.imgPath = '/imgPath' + id;
    product.description = 'description' + id;
    product.details = [
      {
        size: 1,
        price: {
          amount: 100,
        },
      },
    ];
    return { id: id, ...product };
  });
  return products.filter((product) => product.title === params.where.title);
}
