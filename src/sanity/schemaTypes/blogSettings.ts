import { defineType } from "sanity";

export default defineType({
  name: "blogSettings",
  type: "document",
  title: "Blog Settings",
  fields: [
    {
      name: "sidebarImage",
      type: "image",
      title: "Sidebar Profile Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "sidebarText",
      type: "text",
      title: "Sidebar Text",
    },
  ],
});
