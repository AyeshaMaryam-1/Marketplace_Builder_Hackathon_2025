import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'payment',
  type: 'document',
  title: 'Payment',
  fields: [
    defineField({
      name: 'order',
      type: 'reference',
      to: [{ type: 'order' }],
      title: 'Order',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'amount',
      type: 'number',
      title: 'Amount',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Payment Status',
      options: {
        list: [
          { title: 'Paid', value: 'paid' },
          { title: 'Pending', value: 'pending' },
          { title: 'Failed', value: 'failed' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'method',
      type: 'string',
      title: 'Payment Method',
      options: {
        list: [
          { title: 'Credit Card', value: 'credit-card' },
          { title: 'Cash on Delivery', value: 'cod' },
          { title: 'PayPal', value: 'paypal' },
        ],
      },
    }),
  ],
});
