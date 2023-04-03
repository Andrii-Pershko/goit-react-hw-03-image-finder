import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import axios from 'axios';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const baseUrl = 'https://pixabay.com/api/';
const API_KEY = '33728720-baaaf621421e045403ddcb3ff';

export default class ImageGallery extends Component {
  state = {
    galery: [],
    page: 1,
    status: 'idle',
    buttonLoader: false,
    openModal: false,
    activeImg: null,
  };

  // перед кожним оновленням
  async componentDidUpdate(prevProps, prevState) {
    const text = this.props.searchByInputData;
    const { page } = this.state;
    // перевіряємо чи змінилось слово пошуку
    if (prevProps.searchByInputData !== text) {
      this.setState({ status: 'pending', page: 1 });

      try {
        const response = await axios.get(
          `${baseUrl}?q=${text}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState({
          galery: [...response.data.hits],
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
    // перевіряємо чи користувач хоче підвантажити ще картинок
    if (prevState.page !== page && page !== 1) {
      console.log('i here');
      try {
        const response = await axios.get(
          `${baseUrl}?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState(prevState => ({
          galery: [...prevState.galery, ...response.data.hits],
          buttonLoader: false,
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  // Перегоптаєм на наступну сторінку та замість кнопки ставим завантаження
  handleAddImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      buttonLoader: true,
    }));
    setTimeout(() => {
      window.scrollBy({ top: window.innerHeight - 170, behavior: 'smooth' });
    }, 550);
  };
  // відкриває/закриває модалку
  toglleModal = () => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
    }));
  };
  // зберігає індекс обєкта на якого click на розміченій сторінці
  addActiveImg = index => {
    this.setState({
      activeImg: index,
    });
    // відериваєм модалку по кліку
    this.toglleModal();
  };

  render() {
    const { status, galery, buttonLoader, activeImg, openModal } = this.state;
    // якщо зашли в перший раз на сайт
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
      // якщо прийшов порожній список повідомляєм що нічого не знайдено. Данний API при незнайденних даних не повертає 404, а повертає пустий масив
      if (galery.length === 0) {
        return (
          <h2 style={{ textAlign: 'center' }}>
            За запитом "{this.props.searchByInputData}" нічого не знайдено
          </h2>
        );
        // якщо в повернутому масиві є хоть 1 обєкт, малюємо нашу галерею
      } else {
        //якщо масив не порожній робим map по масиву обєкті та рендеримо перші <= 12 елементів
        return (
          <>
            <h2 style={{ textAlign: 'center' }}>
              Результат за запитом:{' '}
              <span style={{ color: '#3f51b5' }}>
                {this.props.searchByInputData}
              </span>
            </h2>
            <ul className={css.ImageGallery}>
              {galery.map(({ id, webformatURL, title }, index) => (
                <ImageGalleryItem
                  onChange={() => this.addActiveImg(index)}
                  className={css.loader}
                  key={id}
                  src={webformatURL}
                  alt={title}
                  index={index}
                />
              ))}
            </ul>

            {/* якщо масив маж менше 12 обєктів не рендерим кнопку  */}
            {/* коли догружаєм нову порцію картинок рендерим замість кнопки loader */}
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
            {/* рендер модалки */}
            {openModal && (
              <Modal
                toglleModal={this.toglleModal}
                largeImageURL={galery[activeImg]}
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

ImageGallery.propTypes = {
  searchByInputData: PropTypes.string,
};
