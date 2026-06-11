export type Author = {
  slug: string;
  name: string;
  image: string;
  bio: string;
};

export const authors: Author[] = [
  {
    slug: "sara-al-zahrani",
    name: "سارة الزهراني",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    bio: "كاتبة متخصصة في الفنادق والإقامة السياحية، تركز على تجارب العائلات والمسافرين العرب.",
  },
  {
    slug: "omar-al-qahtani",
    name: "عمر القحطاني",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "محرر وجهات سياحية يغطي أهم المدن والتجارب السياحية في تركيا والشرق الأوسط.",
  },
  {
    slug: "noura-al-saeed",
    name: "نورة السعيد",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    bio: "كاتبة نصائح سفر تساعد المسافرين على اختيار الوقت المناسب والتخطيط لرحلات أكثر سلاسة.",
  },
];

export function getAuthorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug);
}
