# 📝 Simple Notes App

### ➕ Простое приложение для заметок!

## 🔗 API:

⌛ <small>в начале heroku-сервер просыпается, нужно немного подождать...</small>

### Base URL: `https://simple-notes-back.herokuapp.com`

### GET:

* /`test` - для теста :)
* /`notes` - получить все заметки
* /`notes`/`id_заметки` - конкретная заметка (по id)

* /`users` - получить всех пользователей
* /`users/id_пользователя` - получить конкретного пользователя

### POST:

* /`notes` - для создания новой заметки;
    * Отправить:
  ```typescript
  type example = {
    title: string | null, // Заголовок заметки
    text: string | null // Текст заметки
  }
    ```  
* /`users` - создание пользователя (при регистрации)
    * Отправить:
  ```typescript
    type example = {
        username: string // имя пользователя
        email: string // email
        country: string // страна пользователя
        password: string // пароль
  }
  ```
*

### PUT (update):

* /`notes`/`id_заметки` - обновить заметку
    * Отправить:
  ```typescript
    type example = {
        title: string | null // Заголовок заметки
        text: string | null // Текст заметки
        color: ColorType // типы цветов заметки: blue | green | violet | mustard | dark |default
  }
  ```
* /`users`/`id_пользователя`
    * Отправить:
  ```typescript
    type example = {
        username: string
        country: string
        email: string
  }
  ```
* /`users`/`id_пользователя`/`changePassword` - смена пароля пользователя
  * Отправить:
  ```typescript
    type example = {
        oldPassword: string // Отправляем старый пароль, он проверяется на беке
        newPassword: string // Новый пароль. Установится, если старый введене правильно
    }     
  ```

### DELETE:

* /`notes`/`id_заметки` - удалить заметку по id
* /`users`/`id_пользователя` - удалить пользователя

## 📃 Pages:

* home page / landing - `/`
* notes - `/notes`
* settings - `/settings`
* login = `/signIn`
* registration - `/registration`