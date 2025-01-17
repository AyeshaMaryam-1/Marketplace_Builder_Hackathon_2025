import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'order',
  type: 'document',
  title: 'Order',
  fields: [
    defineField({
      name: 'customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      title: 'Customer',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'product', type: 'reference', to: [{ type: 'product' }], title: 'Product' },
            { name: 'quantity', type: 'number', title: 'Quantity', validation: Rule => Rule.min(1) },
          ],
        },
      ],
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Order Status',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'timestamp',
      type: 'datetime',
      title: 'Order Date',
      validation: Rule => Rule.required(),
    }),
  ],
});
