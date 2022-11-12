# 📝 Simple Notes App

### ➕ Простое приложение для заметок!

## 🔗 API:

⌛ <small>в начале heroku-сервер просыпается, нужно немного подождать...</small>

### Base URL: `https://simple-notes-back.herokuapp.com`

### TEST:
* /`test` - для теста :)
### NOTES:
* get =>   /`notes` - получить все заметки конкретного пользователя
* get  =>  /`notes`/`id_заметки` - конкретная заметка (по id)
* post =>  /`notes` - для создания новой заметки;
* put =>  /`notes`/`id_заметки` - обновить заметку
* delete => /`notes`/`id_заметки` - удалить заметку по id

## Note model
  * Можно будет отправить с запросом put,post
  Отправляется в body
  `title`: string,
  `note_text`: string,
  `color`: string - принимаемые значения ('default', 'dark', 'green', 'blue', 'mustard', 'violet')
              если вы не отправляете, по умолчанию - 'default'
  `note_mode`: string - принимаемые значения ('note_text' || 'note_todo'), 
              если вы не отправляете, по умолчанию - 'note_text'
  Отправляется при put и delete и get запросе в url (в параметрах (`notes/id`))
  `_id` (заметки): string - `required` для манипуляций с конкретной заметкой
              
  * Нельзя отправить с запросом
  `createdAt`: Date - создается на сервере, не изменяется в дальнейшем
  `user`: String - id пользователя, владельца заметки (по id я нахожу на сервере заметки конкретного пользователя)

### AUTH
* post  /`auth`/`registration` - создание пользователя при регистрации
* post  /`auth`/`login` - отправляя email и password созданного пользователя вам приходит сгенерированный token
* get   /`auth`/`me` - если вы залогинены (в header есть действующий токен из local storage) вам приходят все ваши данные

## User model
  * Можно будет отправить с запросом put,post
  Отправляется в body
  `email`: string, `required` при post запросе, minLength: 5, unique (один на сервере может быть), принимается только в виде почтового адреса.
  `password`: string, `required` при post запросе, minLength: 3
  `username`: string
  `country`: string
  `settings`: {
    `darkmode`: boolean, по умолчанию false
    `themecolor`: string, принимаются значения ('default', 'dark', 'green', 'blue', 'mustard', 'violet')
                        по умолчанию - 'default'  
  }
  * Нельзя отправить с запросом
  `createdAt`: Date - создается на сервере, не изменяется в дальнейшем
  `updatedAt`: Date - создается на сервере


## 📃 Future api:
* put  /`user`/`changePassword` - смена пароля пользователя
 * Отправить:
  ```typescript
    type example = {
        oldPassword: string // Отправляем старый пароль, он проверяется на беке
        newPassword: string // Новый пароль. Установится, если старый введене правильно
    }     
  ```
* put /`user` - поменять данные пользователя
    * Отправить:
  ```typescript
    type example = {
        username: string
        country: string
        settings: {darkmode: boolean, themecolor: string}
  }
  ```
## 📃 Pages:

* home page / landing - `/`
* notes - `/notes`
* settings - `/settings`
* login = `/signIn`
* registration - `/registration`

 
  
