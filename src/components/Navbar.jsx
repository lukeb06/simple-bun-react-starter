import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { ModeToggle } from '@/components/mode-toggle.jsx';
import { Button } from '@/components/ui/button';

import { useMediaQuery, query } from '@/hooks/use-media-query.js';

import { Menu } from 'lucide-react';

/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// Navbar Config /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const NAVBAR_CONFIG = {
	links: [
		{
			name: 'Home',
			href: '/',
		},
	],
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const parseHref = href => {
	return `href="${href}"`;
};

const NavbarMenu = () => {
	const [currentPage, setCurrentPage] = useState(window.location.pathname);
	const useDesktop = useMediaQuery(query.md);

	useEffect(() => {
		setCurrentPage(parseHref(window.location.pathname));
	}, []);

	const setPage = e => {
		setCurrentPage(parseHref(e.target.getAttribute('href')));
	};

	return (
		<>
			<style>{`
                nav a[${currentPage}] {
                    position:relative;
                }

                nav a[${currentPage}]:not(.w-full):after {
                    content: '';
                    display: block;
                    height: 2px;
                    width: 80%;
                    background-color: hsl(var(--primary));
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    z-index:100;
                    transform:translateX(-50%);
                }

                nav a[${currentPage}].w-full {
                    background-color: hsl(var(--primary)) !important;
					color: hsl(var(--primary-foreground)) !important;
                }
            `}</style>

			<NavigationMenu className="md:p-2 z-50 h-full md:h-fit w-fit md:w-full md:border-b md:border-border md:bg-background">
				<NavigationMenuList className="w-fit h-full md:h-fit md:w-full flex-col md:flex-row gap-3 overflow-y-auto md:overflow-y-hidden py-4 md:py-0">
					{NAVBAR_CONFIG.links.map((link, index) => (
						<NavigationMenuItem
							key={index}
							className={`!ml-0 ${useDesktop ? '' : 'w-full'}`}
						>
							<Button
								className={useDesktop ? '' : 'w-full'}
								onClick={setPage}
								asChild
								variant={useDesktop ? 'ghost' : 'outline'}
							>
								<Link to={link.href}>{link.name}</Link>
							</Button>
						</NavigationMenuItem>
					))}

					<div className="flex flex-grow flex-col-reverse md:flex-row-reverse">
						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
};

const MobileNavbar = () => {
	return (
		<NavigationMenu className="p-2 z-50 border-b border-border bg-background">
			<NavigationMenuList className="w-full justify-normal">
				<NavigationMenuItem>
					<Sheet>
						<Button asChild variant="outline" size="icon">
							<SheetTrigger>
								<Menu />
							</SheetTrigger>
						</Button>
						<SheetContent side="left">
							<NavbarMenu />
						</SheetContent>
					</Sheet>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const Navbar = () => {
	const useDesktop = useMediaQuery(query.md);
	return useDesktop ? <NavbarMenu /> : <MobileNavbar />;
};

export default Navbar;
