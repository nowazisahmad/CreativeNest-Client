export interface ISlide {
  id: number;
  headline: string;
  subtext: string;
  cta: { label: string; href: string; icon: React.ReactNode };
  secondaryCta: { label: string; href: string };
  bgImage: string;
  overlayGradient: string;
  accent: string;
  icon: React.ReactNode;
  tag: string;
}