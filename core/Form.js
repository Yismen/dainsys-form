import Error from './Error.js';
import Toast from 'v-toast'

export default class Form {
    constructor (data) {

        this.originalData = data;
        this.fields = {}

        for (let field in data) {
            this.fields[field] = data[field];
        }

        this.error = new Error();
        this.notify = Toast;
        this.http = Vue.http;
    }

    submit(requestType, url) {

        requestType = requestType.toLowerCase();

        return new Promise((resolve, reject) => {

            this.notify.loading({message: 'Loading. Please wait!', duration: 0});
            this.http[requestType](url, this.fields)
                .then(response => {
                    this.onSuccess(response.data);

                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.data);

                    reject(error.data);
                })

            this.notify.remove
        });
    }

    onSuccess(response) {
        this.error.clear();

        this.reset();

        this.notify.success({message: 'Great! Operation successful.', duration: 3000});

        return response;
    }

    onFail(errors) {
        this.notify.error({message: 'Oups! There are errors...', duration: 3000});

        this.error.record(errors);
    }

    get(url) {
        return this.submit('get', url);
    }

    post(url) {
        return this.submit('post', url);
    }

    put(url) {
        return this.submit('put', url);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    resetField(field) {
        this.fields[field] = '';
    }

    reset(field) {
        if (field) { 
            return this.fields[field] = '';
        }

        for(let field in this.fields) {
            this.fields[field] = '';
        }
    }
}
