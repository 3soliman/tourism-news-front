export type Destination = {
    id: number;
    name: string;
    slug: string;
    country: string;
    description: string;
    image: string;
    articlesCount: number;
    bestTime: string;
  };
  
  export const destinations: Destination[] = [
    {
      id: 1,
      name: "إسطنبول",
      slug: "istanbul",
      country: "تركيا",
      description:
        "مدينة تجمع بين التاريخ، التسوق، المطاعم، والفنادق المناسبة للعائلات.",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
      articlesCount: 12,
      bestTime: "الربيع والخريف",
    },
    {
      id: 2,
      name: "طرابزون",
      slug: "trabzon",
      country: "تركيا",
      description:
        "وجهة طبيعية مميزة للعوائل ومحبي الجبال والبحيرات والأجواء الهادئة.",
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200&auto=format&fit=crop",
      articlesCount: 8,
      bestTime: "الصيف",
    },
    {
      id: 3,
      name: "دبي",
      slug: "dubai",
      country: "الإمارات",
      description:
        "وجهة فاخرة تجمع بين التسوق، الفنادق العالمية، الفعاليات، والشواطئ.",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
      articlesCount: 10,
      bestTime: "نوفمبر إلى مارس",
    },
  ];