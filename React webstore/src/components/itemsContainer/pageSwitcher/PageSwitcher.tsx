import React from 'react';
import classes from './PageSwitcher.module.scss'

class PageSwitcher extends React.Component<{ activePage: any }, { activeButton: any }> {
    constructor(props: any) {
        super(props)
        this.state = {
            activeButton: 1
        }
        this.button1clicked = this.button1clicked.bind(this)
        this.button2clicked = this.button2clicked.bind(this)
        this.button3clicked = this.button3clicked.bind(this)
        this.button4clicked = this.button4clicked.bind(this)
    }

    button1clicked = () => {
        this.setState({ activeButton: 1 })
        this.props.activePage(1)
    }

    button2clicked = () => {
        this.props.activePage(2)
        this.setState({ activeButton: 2 })
    }

    button3clicked = () => {
        this.setState({ activeButton: 3 })
        this.props.activePage(3)
    }

    button4clicked = () => {
        this.setState({ activeButton: 4 })
        this.props.activePage(4)
    }



    render() {
        return (
            <div className={classes.switchWrapper}>
                <div className={classes.switchWall}>
                    <button onClick={this.button1clicked} className={this.state.activeButton === 1 ? classes.active : ''}>1</button>
                    <button onClick={this.button2clicked} className={this.state.activeButton === 2 ? classes.active : ''}>2</button>
                    <button onClick={this.button3clicked} >3</button>
                    <button onClick={this.button4clicked}>4</button>
                    <div>{this.state.activeButton}</div>
                </div>
            </div>
        )
    }
}

export default PageSwitcher;