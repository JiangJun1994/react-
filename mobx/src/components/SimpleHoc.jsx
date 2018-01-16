import React from 'react';

// const SimpleHoc = WrappedComponent => {

//     return class extends React.Component {
//         handleClick(){
//             console.log('click')
//         }

//         render(){
//             return <WrappedComponent {...this.props} handleClick = {this.handleClick}/>
//         }
//     }
// }
class SimpleHoc extends React.Component {
    
    handleClick() {
        console.log('click')
    }

    render() {
        return (
            <div>hhh</div>
        )
    }
}
export default SimpleHoc