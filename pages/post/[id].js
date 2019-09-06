import {useRouter} from 'next/router';

export default function Post() {
    const router = useRouter();

    return (
        <div>
            <h1>{router.query.id}</h1>
            <p>This is the blog post content.</p>
        </div>
    );
}

Post.getInitialProps = async function(context) {
    const {id} = context.query;

    return {};
};
