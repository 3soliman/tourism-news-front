export type Category = {
  slug: string;
  label: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "aviation",
    label: "أخبار الطيران",
    description:
      "آخر أخبار الطيران، الرحلات، شركات الطيران، والتحديثات المؤثرة على المسافرين.",
  },
  {
    slug: "visas",
    label: "أخبار التأشيرات",
    description:
      "تغطية لأخبار التأشيرات، متطلبات السفر، والتحديثات الرسمية للمسافرين العرب.",
  },
  {
    slug: "hotels",
    label: "أخبار الفنادق",
    description:
      "أخبار الفنادق والمنتجعات، الإقامة السياحية، والعروض المرتبطة بالإقامة.",
  },
  {
    slug: "destinations",
    label: "أخبار الوجهات السياحية",
    description:
      "أخبار ومقالات عن أهم الوجهات السياحية التي يفضلها المسافرون العرب.",
  },
  {
    slug: "international",
    label: "أخبار السفر الدولية",
    description:
      "متابعة أخبار السفر الدولي، التنقل، والتطورات التي تهم المسافرين حول العالم.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
