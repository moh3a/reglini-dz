export const navigation = {
  categories: [
    {
      id: "products",
      name: "Products",
      featured: [
        {
          name: "Aliexpress",
          href: "/aliexpress",
          imageSrc: "/aliexpress-icon.png",
          imageAlt: "Aliexpress icon.",
        },
        {
          name: "Netflix",
          href: "/netflix",
          imageSrc: "/Netflix_N_logo.png",
          imageAlt: "Netflix icon.",
        },
      ],
      sections: [
        {
          id: "aliexpress",
          name: "Aliexpress",
          items: [
            {
              name: "Apparel Accessories",
              href: "/aliexpress/category/205776616",
            },
            {
              name: "Men's Clothing",
              href: "/aliexpress/category/205776616",
            },
            {
              name: "Women's Clothing",
              href: "/aliexpress/category/100003109",
            },
            {
              name: "Automobiles & Motorcycles",
              href: "/aliexpress/category/34",
            },
            {
              name: "Beauty & Health",
              href: "/aliexpress/category/66",
            },
            {
              name: "Cellphones & Telecommunications",
              href: "/aliexpress/category/509",
            },
            {
              name: "Computer & Office",
              href: "/aliexpress/category/7",
            },
          ],
        },
        // {
        //   id: "accessories",
        //   name: "Accessories",
        //   items: []
        //  }
      ],
    },
    // {
    //   id: "categories",
    //   name: "Categories",
    //   featured: [],
    //   sections: [],
    // },
  ],
  pages: [
    { name: "Currency exchange", href: "/currency" },
    { name: "Support", href: "/support" },
    { name: "FAQ", href: "/faq" },
  ],
};
