import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tomi Beauty & Spa — Luxury Beauty & Wellness in Arepo, Ogun State" },
      {
        name: "description",
        content:
          "Premium beauty treatments, advanced skincare and wellness rituals at Tomi Beauty & Spa, Arepo, Ogun State. Book your luxury experience today.",
      },
      { name: "author", content: "Tomi Beauty & Spa" },
      { property: "og:title", content: "Tomi Beauty & Spa — Luxury Beauty & Wellness in Arepo, Ogun State" },
      {
        property: "og:description",
        content:
          "Indulge in luxury beauty and wellness rituals crafted to perfection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Tomi Beauty & Spa — Luxury Beauty & Wellness in Arepo, Ogun State" },
      { name: "description", content: "Aura Glow Spa is a luxury beauty and wellness website showcasing premium services." },
      { property: "og:description", content: "Aura Glow Spa is a luxury beauty and wellness website showcasing premium services." },
      { name: "twitter:description", content: "Aura Glow Spa is a luxury beauty and wellness website showcasing premium services." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b9c47df2-dc43-46e6-829d-762295cee8fb/id-preview-0d01a939--e5f468f9-fc93-4450-8952-1e611ef8e701.lovable.app-1777932308683.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b9c47df2-dc43-46e6-829d-762295cee8fb/id-preview-0d01a939--e5f468f9-fc93-4450-8952-1e611ef8e701.lovable.app-1777932308683.png" },
    ],
    links: [
      { rel: "icon", type: "image/jpeg", href: "/logo-tomi.jpg" },
      { rel: "apple-touch-icon", href: "/logo-tomi.jpg" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      <ChatbotWidget />
    </>
  );
}
