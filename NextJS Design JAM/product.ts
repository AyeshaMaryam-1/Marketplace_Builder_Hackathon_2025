import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Product Name',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: Rule => Rule.min(0).required(),
    }),
    defineField({
      name: 'stock',
      type: 'number',
      title: 'Stock Quantity',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Abayas', value: 'abayas' },
          { title: 'Dresses', value: 'dresses' },
          { title: 'Modest Clothing', value: 'modest-clothing' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'seller',
      type: 'reference',
      to: [{ type: 'seller' }],
      title: 'Seller',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Product Image',
      options: { hotspot: true },
    }),
  ],
});
