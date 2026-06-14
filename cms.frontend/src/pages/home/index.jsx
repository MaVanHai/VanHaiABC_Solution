import React from 'react';

import MainLayout from '../../components/layout/MainLayout';

import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';

function Home() {
    return (
        <MainLayout>

            <HeroBanner />
            <CategoryMenu />
            <ProductGrid />
            <LatestBlog />

        </MainLayout>
    );
}

export default Home;