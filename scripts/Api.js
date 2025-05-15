// Api.js
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    // Validação adicional
    if (!data.name || !data.link) {
      return Promise.reject("Campos 'name' e 'link' são obrigatórios");
    }

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name.trim(),
        link: data.link.trim()
      })
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

likeCard(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this._headers,
  }).then(this._checkResponse);
}

unlikeCard(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this._headers,
  }).then(this._checkResponse);
}
  updateLikes(likes) {
    this._likes = likes || []; // Garante que seja um array mesmo se undefined
    this._renderLikes();
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(this._checkResponse);
  }

  getCardDetails(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers
    }).then(this._checkResponse);
  }
}
