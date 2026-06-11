export type TravelOffer = {
    id: number;
    title: string;
    destination: string;
    duration: string;
    price: string;
    badge: string;
    image: string;
    features: string[];
  };
  
  export const offers: TravelOffer[] = [
    {
      id: 1,
      title: "برنامج سياحي في تركيا للعائلات",
      destination: "تركيا",
      duration: "7 أيام / 6 ليالي",
      price: "ابتداءً من 650$",
      badge: "الأكثر طلبًا",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
      features: ["فنادق مناسبة للعائلات", "جولات يومية", "استقبال من المطار"],
    },
    {
      id: 2,
      title: "عطلة فاخرة في دبي",
      destination: "الإمارات",
      duration: "5 أيام / 4 ليالي",
      price: "ابتداءً من 780$",
      badge: "عرض خاص",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
      features: ["فندق 4 نجوم", "جولة مدينة", "خدمة حجز مرنة"],
    },
    {
      id: 3,
      title: "رحلة استرخاء إلى ماليزيا",
      destination: "ماليزيا",
      duration: "8 أيام / 7 ليالي",
      price: "ابتداءً من 720$",
      badge: "مناسب لشهر العسل",
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop",
      features: ["كوالالمبور", "لنكاوي", "فنادق مختارة"],
    },
  ];