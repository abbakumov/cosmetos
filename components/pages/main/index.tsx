import React, {FC} from 'react';

import MobileLayout from '../../layouts/MobileLayout';

import Blogs from './components/Blogs';
import ProductReviews from './components/ProductReviews';
import Posts from './components/Posts';

export interface MainPageProps {}

const MainPage: FC = () => (
    <MobileLayout>
        <Blogs />
        <ProductReviews />
        <Posts />
    </MobileLayout>
);

export default MainPage;
