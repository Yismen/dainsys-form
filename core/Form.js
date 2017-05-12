import Error from './Error.js';

export default class Form {
    constructor (data) {

        this.originalData = data;
        this.fields = {}

        for (let field in data) {
            this.fields[field] = data[field];
        }

        this.error = new Error();
        this.http = Vue.http;
    }

    submit(requestType, url) {

        requestType = requestType.toLowerCase();

        return new Promise((resolve, reject) => {
            this.http[requestType](url, this.fields)
                .then(response => {
                    this.onSuccess(response.data);

                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.data);

                    reject(error.data);
                })
        });
    }

    onSuccess(response) {
        this.error.clear();

        this.reset();

        return response;
    }

    onFail(errors) {
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
