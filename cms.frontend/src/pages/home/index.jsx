import React, { useState } from 'react';

import MainLayout from '../../components/layout/MainLayout';

import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';

function Home() {

    const [activeCategoryId, setActiveCategoryId] =
        useState(null);

    return (
        <MainLayout>

            <HeroBanner />

            <CategoryMenu
                activeCategoryId={activeCategoryId}
                setActiveCategoryId={setActiveCategoryId}
            />

            <ProductGrid
                activeCategoryId={activeCategoryId}
            />

            <LatestBlog />

        </MainLayout>
    );
}

export default Home;