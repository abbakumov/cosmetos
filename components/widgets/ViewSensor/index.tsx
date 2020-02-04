import React, {Component, createRef} from 'react';

const styles = require('./styles.styl');

interface Props {
    isFetching: boolean
    isActive: boolean
    onViewed(): void
}

class ViewSensor extends Component<Props> {
    private rootRef = createRef<HTMLDivElement>();

    onScrollCallback = () => {
        const {onViewed, isActive, isFetching} = this.props;

        if (!isActive || isFetching || !this.rootRef.current) { return; }

        const bottomScroll = window.pageYOffset + window.innerHeight;
        const rootTop = this.rootRef.current.getBoundingClientRect().top;

        if (bottomScroll - rootTop > 30) {
            onViewed();
        }
    };

    componentDidMount() {
        document.addEventListener('scroll', this.onScrollCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrollCallback);
    }

    render() {
        const {isFetching, isActive} = this.props;

        if (!isActive) {
            return null;
        }

        if (isFetching) {
            return (
                <div className={styles.root} ref={this.rootRef}>
                    <img
                        className={styles.animation}
                        src="/static/icons/fetching-anim.svg"
                    />
                </div>
            );
        }

        if (!isFetching) {
            return (
                <div className={styles.root} ref={this.rootRef}/>
            );
        }
    }
}

export default ViewSensor;
