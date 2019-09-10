import React, {Component} from 'react';
import {connect} from 'react-redux';

class BlogPage extends Component {
    render() {
        return (
            <div>blog page!</div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

const ConnectedBlogPage = connect(mapStateToProps)(BlogPage);

export default ConnectedBlogPage;