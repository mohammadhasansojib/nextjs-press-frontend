'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/service/logout';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  logo?: string;
  userAvatar?: {
    image?: string;
    initials: string;
    name: string;
    email: string;
  };
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/dashboard"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Blogs",
    href: "/blogs"
  },
  {
    label: "Contact",
    href: "/contact"
  },
]

const onLogout = async () => {
    await logout();
}

export function Navbar({
  logo = 'Logo',
  userAvatar = {
    initials: 'JS',
    name: 'Name Here',
    email: 'Email Here',
  },
//   onLogout,
  onProfileClick,
  onSettingsClick,
}: NavbarProps) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname === href;
  };

  const isLoggedIn = userAvatar.name !== "Name Here";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="shrink-0">
          <Link href="/" className="text-xl font-bold text-foreground">
            {logo}
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden gap-8 md:flex md:flex-1 md:justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Mobile Menu + User Dropdown */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Avatar Dropdown */}
          {
            isLoggedIn ? 
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="shrink-0 rounded-full outline-offset-2 transition-all hover:outline hover:outline-ring">
                <Avatar className="h-9 w-9">
                  {userAvatar.image && (
                    <AvatarImage src={userAvatar.image} alt="User avatar" />
                  )}
                  <AvatarFallback className="bg-muted text-sm font-semibold">
                    {userAvatar.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                    <p className="truncate text-sm font-medium">
                    {userAvatar.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                    {userAvatar.email}
                    </p>
                </div>

                <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsClick}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="text-destructive focus:text-destructive"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          : <Link href={`/login`}>
                <Button className='cursor-pointer'>Login</Button>          
          </Link>
          }
        </div>
      </div>
    </nav>
  );
}
