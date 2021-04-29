export default class GotService {
  constructor() {
    this._apiBase = "https://anapioficeandfire.com/api";
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  };

  async getAllBooks() {
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBooks);
  }

  async getBook(id) {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBooks(book);
  }

  async getAllCharacters() {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  }

  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  async getAllHouses() {
    const res = this.getResource(`/houses/`);
    return res.map(this._transformHouse);
  }

  async getHouse(id) {
    const house = await this.getResource(`/houses/${id}/`);
    return this._transformHouse(house);
  }

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }

  _transformBooks(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released,
    };
  }
}
