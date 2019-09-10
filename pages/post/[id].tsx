import {connect} from 'react-redux';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Link from 'next/link';

const Post: NextPage<{}> = () => {
    const router = useRouter();

    return (
        <div>
            <Link href="/post/[id]" as="/post/1">
                <a>the first</a>
            </Link>
            <Link href="/post/[id]" as="/post/2">
                <a>the second</a>
            </Link>

            <h1>{router.query.id}</h1>
            <p>This is the blog post content.</p>
        </div>
    );
}

Post.getInitialProps = async function(context) {
    const {id} = context.query;

    return {};
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Post);
