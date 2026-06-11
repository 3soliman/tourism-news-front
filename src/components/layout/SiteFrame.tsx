type SiteFrameProps = {
  children: React.ReactNode;
};

export default function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="site-frame min-h-screen w-full overflow-x-hidden bg-page-bg">
      {children}
    </div>
  );
}
