import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/post'


const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return (
        <div>

        </div>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStatsToProps = state => ({
    post: state.post
})

export default connect(mapStatsToProps, { getPosts })(Posts)
