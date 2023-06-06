import { Modal } from "./Modal.js";

export class API {
  static #route = "https://6316ee46cb0d40bc41471818.mockapi.io/users/";

  static async getUsers() {
    const response = await fetch(API.#route);
    if (response.ok) {
      const users = await response.json();
      return users;
    } else {
      throw new Error(response.statusText);
    }
  }

  static async getUser(id) {
    Modal.addLoaderLayout();

    const response = await fetch(API.#route + id);
    if (response.ok) {
      const user = await response.json();
      Modal.removeLoaderLayout();
      return user;
    } else {
      throw new Error(response.statusText);
    }
  }

  static async putUser(id, body, isLoader = false) {
    const bodyContent = JSON.stringify(body);

    const headersList = {
      "Content-Type": "application/json",
    };

    const options = {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    };

    if (isLoader) Modal.addLoaderLayout();

    const response = await fetch(API.#route + id, options);

    if (response.ok) {
      const user = await response.json();
      if (isLoader) setTimeout(Modal.removeLoaderLayout, 200);
      return user;
    } else {
      throw new Error(response.statusText);
    }
  }
}
