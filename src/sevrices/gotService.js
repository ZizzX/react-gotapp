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
      name: char.name ? char.name : "❌",
      gender: char.gender ? char.gender : "❌",
      born: char.born ? char.born : "❌",
      died: char.died ? char.died : "❌",
      culture: char.culture ? char.culture : "❌",
      url: char.url,
    };
  }

  _transformHouse(house) {
    return {
      name: house.name  ? house.name : "❌",
      region: house.region  ? house.region : "❌",
      words: house.words  ? house.words : "❌",
      titles: house.titles  ? house.titles : "❌",
      overlord: house.overlord  ? house.overlord : "❌",
      ancestralWeapons: house.ancestralWeapons  ? house.ancestralWeapons : "❌",
    };
  }

  _transformBooks(book) {
    return {
      name:  book.name ? book.name : "❌",
      numberOfPages: book.numberOfPages ? book.numberOfPages : "❌",
      publisher: book.publisher ? book.publisher : "❌",
      released: book.released ? book.released : "❌",
    };
  }
}
