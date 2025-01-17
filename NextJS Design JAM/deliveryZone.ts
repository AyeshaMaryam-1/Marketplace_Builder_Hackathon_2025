import { defineType } from 'sanity';

export default defineType({
  name: 'deliveryZone',
  title: 'Delivery Zone',
  type: 'document',
  fields: [
    {
      name: 'zoneName',
      title: 'Zone Name',
      type: 'string',
      description: 'Name of the delivery zone.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverageArea',
      title: 'Coverage Area',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of postal codes or cities covered in this zone.',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'assignedDriver',
      title: 'Assigned Driver',
      type: 'reference',
      to: [{ type: 'driver' }],
      description: 'Driver assigned to handle deliveries in this zone.',
    },
  ],
});
