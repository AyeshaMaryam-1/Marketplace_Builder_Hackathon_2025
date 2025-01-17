import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seller',
  type: 'document',
  title: 'Seller',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Seller Name',
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
      title: 'Address',
    }),
    defineField({
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
  ],
});
