import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'customer',
  type: 'document',
  title: 'Customer',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Customer Name',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: Rule => Rule.email().required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
    }),
    defineField({
      name: 'address',
      type: 'text',
      title: 'Delivery Address',
    }),
    defineField({
      name: 'orderHistory',
      type: 'array',
      title: 'Order History',
      of: [{ type: 'reference', to: [{ type: 'order' }] }],
    }),
  ],
});
