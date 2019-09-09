import React, {Component} from 'react';
import {connect} from 'react-redux';

class BlogPage extends Component {

}

function mapStateToProps(state) {
    return {};
}

const ConnectedBlogPage = connect(mapStateToProps)(BlogPage);

export default ConnectedBlogPage;