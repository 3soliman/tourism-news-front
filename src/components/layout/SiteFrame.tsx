type SiteFrameProps = {
  children: React.ReactNode;
};

export default function SiteFrame({ children }: SiteFrameProps) {
  return <div className="site-frame min-h-screen">{children}</div>;
}
