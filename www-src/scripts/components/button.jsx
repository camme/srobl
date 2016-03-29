const React = require('react');

class Button extends React.Component {

    constructor (props, context) {
        super(props, context);
    }

    handleClick (e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render () {

        let classes = 'button';
        if (this.props.type === 'error') {
            classes = 'button--error';
        }

        return (
            <button className={classes} onClick={this.handleClick.bind(this)}>{this.props.children}</button>
        );

    }

}

module.exports = Button;
