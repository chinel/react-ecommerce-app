import React from 'react';

import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './error-boundary.styles'


//instantiating a class component
class ErrorBoundary extends React.Component{

    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    //static lifecycle method
    //What this method does is that it catches any error that gets thrown in any of the children of this ErrorBoundary Component
    //So we will be wrapping the Error Boundary Component around components and whenever any error get thrown it is passed into
    //this method
    static getDerivedStateFromError (error){
     //process the error


     //we will return an object that set the state inside of this class
        return {hasErrored: true}
    }

    //this another lifecycle method that lets react know this is an error boundary
    //this gives us access to the error as well the info related to the error and how it got thrown
    //the info might be which component threw the error
    componentDidCatch(error, errorInfo) {
        // all you can do in here is mayybe log the error or send the error somewhere
        //it allows us to perform some side effects with the error
        //the most important lifecycle method when creating an error boundary is the getDerivedStateFromError which enables to get the error from
        //the child component when it gets thrown and then let this component know there was an error thrown
        console.log(error);

    }


    //here we check if there was an error thrown and return a div with a message or it could a ui that represents our error state
    render() {
        if (this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png"/>
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        //and if there are no errors the children component will render as usual
        return this.props.children;
    }

}

export default ErrorBoundary;
