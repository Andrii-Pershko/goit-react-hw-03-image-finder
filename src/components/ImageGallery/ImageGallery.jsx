import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import axios from 'axios';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';

const baseUrl = 'https://pixabay.com/api/';
const API_KEY = '33728720-baaaf621421e045403ddcb3ff';

// idle, pending, resolved, rejected;
export default class ImageGallery extends Component {
  state = {
    galery: [],
    itemsInPage: 12,
    status: 'idle',
    buttonLoader: false,
  };

  // перед кожним оновленням
  async componentDidUpdate(prevProps, prevState) {
    const text = this.props.searchByInputData;
    // перевіряємо чи змінилось слово пошуку
    if (prevProps.searchByInputData !== this.props.searchByInputData) {
      this.setState({ status: 'pending' });

      try {
        const response = await axios.get(
          `${baseUrl}?q=${text}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.itemsInPage}`
        );
        this.setState({
          galery: [...response.data.hits],
          itemsInPage: 12,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
    // перевіряємо чи користувач хоче підвантажити ще картинок
    if (prevState.itemsInPage !== this.state.itemsInPage) {
      const response = await axios.get(
        `${baseUrl}?q=${text}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.itemsInPage}`
      );
      this.setState({
        galery: [...response.data.hits],
        buttonLoader: false,
      });
    }
  }

  // Добавляє до стейту "картинок на сторінці" +12шт
  handleAddImg = () => {
    console.log('click');
    this.setState(prevState => ({
      itemsInPage: prevState.itemsInPage + 12,
      buttonLoader: true,
    }));
  };

  render() {
    const { status, galery, buttonLoader } = this.state;

    // якщо нічого не шукали
    if (status === 'idle') {
      return (
        <h2 style={{ textAlign: 'center', marginTop: 50 }}>
          Введіть будь ласка в поле пошуку те що бажаєте знайти
        </h2>
      );
    }
    // коли ввели і підвантажуються данні
    if (status === 'pending') {
      return (
        <RotatingLines
          className={css.Loader}
          strokeColor=" #303f9f"
          animationDuration="0.9"
          width="40"
        />
      );
    }
    // малюємо галерею
    if (status === 'resolved') {
      // якщо прийшов порожній список повідомляєм. Данний API при незнайденних даних не повертає 404, а повертає пустий масив
      if (galery.length === 0) {
        return (
          <h2 style={{ textAlign: 'center' }}>
            За запитом "{this.props.searchByInputData}" нічого не знайдено
          </h2>
        );
        // якщо в повернутому масиві є хоть 1 обєкт, малюємо нашу галерею
      } else {
        return (
          <>
            <h2 style={{ textAlign: 'center' }}>
              Результат за запитом:{' '}
              <span style={{ color: '#3f51b5' }}>
                {this.props.searchByInputData}
              </span>
            </h2>
            <ul className={css.ImageGallery}>
              {galery.map(image => (
                <ImageGalleryItem
                  className={css.loader}
                  key={image.id}
                  src={image.webformatURL}
                  alt={image.title}
                />
              ))}
            </ul>
            {!buttonLoader ? (
              galery.length % 12 === 0 ? (
                <Button onChange={this.handleAddImg}></Button>
              ) : null
            ) : (
              <RotatingLines
                className={css.Loader}
                strokeColor=" #303f9f"
                animationDuration="0.9"
                width="40"
              />
            )}
          </>
        );
      }
    }
    // якщо виникла помилка
    if (status === 'rejected') {
      return <h2>Виникла невідома помилка повторіть пошук</h2>;
    }
  }
}
