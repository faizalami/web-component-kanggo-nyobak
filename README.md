## Web Component Kanggo Nyobak

Website sederhana dibangun pake web component dan di-bundle pake webpack.
> Projek ini pake API dari [strapi-kanggo-nyobak](https://github.com/faizalami/strapi-kanggo-nyobak/tree/simple) dari branch "**simple**"

### Development
```shell
# Setelah clone projek, install dependencies dengan
$ npm install
# atau
$ yarn install

# Setelah itu jangan lupa buat file .env, bisa copy dari .env.example kalo nggak ada customisasi
$ cp .env.example .env

# Projek siap di-run pake
$ npm run start
# atau
$ yarn start
```

### Production
```shell
# Untuk build production tinggal pake
$ npm run build
# atau
$ yarn build

# Kalo belum ada web server bisa dicoba pake
$ npm run prod
# atau
$ yarn prod
```
