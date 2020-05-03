import React, {FC} from 'react';

import MobileLayout from '../../layouts/MobileLayout';

import Blogs from './components/Blogs';

export interface MainPageProps {}

const MainPage: FC = () => (
    <MobileLayout>
        <Blogs />
    </MobileLayout>
);

export default MainPage;
