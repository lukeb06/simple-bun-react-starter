import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/global.css';
import '@/index.scss';

import { ThemeProvider } from '@/components/theme-provider';
import { StoreProvider } from '@/hooks/use-store';
import { LocalStorageProvider } from '@/hooks/use-local-storage';

import Home from '@/pages/Home';

import Navbar from '@/components/Navbar';

const ROOT = document.getElementById('root');

const LAYOUT = (
	<ThemeProvider defaultTheme="system" storageKey="ui-theme">
		<StoreProvider>
			<LocalStorageProvider>
				<BrowserRouter>
					<Navbar />
					<main className="py-4 pb-8 max-w-[1200px] mx-auto px-4 md:px-12 grid place-items-center overflow-hidden">
						<Routes>
							<Route path="/" element={<Home />} />
						</Routes>
					</main>
				</BrowserRouter>
			</LocalStorageProvider>
		</StoreProvider>
	</ThemeProvider>
);

if (ROOT.hasChildNodes()) {
	ReactDOM.hydrateRoot(LAYOUT, ROOT);
} else {
	ReactDOM.createRoot(ROOT).render(LAYOUT);
}
