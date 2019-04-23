module.exports = {
    port: 8080,
    host: 'localhost',
    dbName: 'olymp-pstu',
    db: {
        database: 'olymp-pstu',
        user: 'root',
        password: '',
        port: 3306,
    },
    secret: 'DO NOT FORGET TO CHANGE THIS IN PRODUCTION',
    googleClientId: 'ID_FROM_GOOGLE_DEV_CONSOLE',
    mail: {
        domain: 'olymp.fruch.pw',
        receiver: 'Тут должен быть e-mail того, кто принимает сообщения',
    }
};
