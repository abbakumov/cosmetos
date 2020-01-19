import {FC} from 'react';

const styles = require('./styles.styl');

interface Props {
    children: string;
}

const SectionTitle: FC<Props> = (props: Props) => (
    <div className={styles.root}>{props.children}</div>
);

export default SectionTitle;
