import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'shipment',
  type: 'document',
  title: 'Shipment',
  fields: [
    defineField({
      name: 'order',
      type: 'reference',
      to: [{ type: 'order' }],
      title: 'Order',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Shipment Status',
      options: {
        list: [
          { title: 'In Transit', value: 'in-transit' },
          { title: 'Delivered', value: 'delivered' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'deliveryDate',
      type: 'datetime',
      title: 'Delivery Date',
    }),
  ],
});
