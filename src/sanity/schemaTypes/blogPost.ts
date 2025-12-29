import { defineType } from "sanity";

export default defineType({
  name: "blogPost",
  type: "document",
  title: "Blog Post",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      type: "string",
      title: "Author",
    },
    {
      name: "date",
      type: "datetime",
      title: "Date",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      options: {
        hotspot: true,
      },
    },
    {
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }],
    },
  ],
});
