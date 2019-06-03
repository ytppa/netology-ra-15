/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["product"] }] */


class MyStorage {
    getString = (aName, aDefault) => {
      const value = localStorage.getItem(aName);
      let result = aDefault;
      if (value === null) {
        if (aDefault && aDefault.length) {
          localStorage.setItem(aName, aDefault);
        }
      } else {
        result = value;
      }
      return result;
    };

    setString = (aName, aValue) => {
      localStorage.setItem(aName, aValue);
    }

    addToArray = (aName, aData) => {
      const arr = this.getArray(aName);
      arr.push(aData);
      localStorage.setItem(aName, JSON.stringify(arr));
    }

    // Вы смотрели
    addToOverlooked = (aId) => {
      const name = 'viewed';
      const arr = this.getArray(name);
      const i = arr.findIndex(el => el === aId);

      if (i !== -1) {
        // Передобавим в конец
        arr.splice(i, 1);
      }
      arr.push(aId);
      localStorage.setItem(name, JSON.stringify(arr));
      return true;
    }

    getOverlooked = () => {
      const name = 'viewed';
      const arr = this.getArray(name);
      if (arr.length > 10) {
        arr.splice(0, arr.length - 10);
        localStorage.setItem(name, JSON.stringify(arr));
      }
      return arr;
    }


    // Получить массив данных из переменной в localStorage. Если переменной нет, то создать.
    getArray = (aName) => {
      const str = localStorage.getItem(aName);
      let arr = [];
      if (str === null) {
        localStorage.setItem(aName, JSON.stringify(arr));
      } else {
        arr = JSON.parse(str);
      }

      return arr;
    }

    // Получить массив избранного
    getFavorites = () => {
      const arr = this.getArray('favorites');
      return arr;
    }

    // Узнать - есть ли данный продукт в избранном
    isFavorite = (aId) => {
      const arr = this.getArray('favorites');
      const i = arr.findIndex(el => el === aId);
      if (i !== -1) {
        return true;
      }
      return false;
    }

    // Добавить/Убрать продукт из избранного
    switchFavorite = (aId) => {
      const arr = this.getArray('favorites');
      const i = arr.findIndex(el => el === aId);
      let result = null;

      if (i === -1) {
        arr.push(aId);
        result = true;
      } else {
        arr.splice(i, 1);
        result = false;
      }
      localStorage.setItem('favorites', JSON.stringify(arr));
      return result;
    }


    // Добавить всем продуктам в массиве свойство favourite типа boolean
    updateFavoriteProducts = (aProducts) => {
      const arr = this.getArray('favorites');
      const products = aProducts;

      products.forEach((product, index) => {
        product.favorite = arr.some(el => product.id === el);
        products[index] = product;
      });
      return products;
    }

    // Временный метод. Удалять переменную из localStorage
    clear = aName => localStorage.removeItem(aName)
}

const Storage = new MyStorage();
export default Storage;
