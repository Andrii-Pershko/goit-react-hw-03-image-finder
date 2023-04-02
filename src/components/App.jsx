import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    searchImg: null,
  };

  setSearchText = data => {
    this.setState({ searchImg: data });
  };

  textSending = () => {
    return this.state.searchImg;
  };

  render() {
    const { setSearchText, textSending } = this;
    return (
      <>
        <Searchbar liftData={setSearchText} />
        <ImageGallery searchByInputData={textSending()} />
      </>
    );
  }
}
