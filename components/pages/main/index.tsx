import React, {FC} from 'react';

import MobileLayout from '../../layouts/MobileLayout';

import Blogs from './components/Blogs';
import Posts from './components/Posts';

export interface MainPageProps {}

const MainPage: FC = () => (
    <MobileLayout>
        <Blogs />
        <Posts />
    </MobileLayout>
);

export default MainPage;
