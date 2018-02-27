import Error from './Error.js';
import http from 'axios';

export default class Form {
    constructor(data, options = {}) {
        this.default = Object.assign({
            reset: true
        }, options);

        this.fields = {}
        this.files = new FormData()

        for (let field in data) {
            // this[field] = data[field];
            this.fields[field] = data[field];
        }

        this.error = new Error();
        this.http = http;
    }

    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            this.fields = this.getLoadedFiles();

            this.http[requestType](url, this.fields)
                .then(response => {
                    this.onSuccess(response.data);

                    resolve(response);
                })
                .catch(errors => {
                    this.onFail(errors.response.data);

                    reject(errors.response);
                })
        });
    }

    onSuccess(response) {
        this.error.clear();

        if (this.default.reset) {
            this.reset();
        }
    }

    onFail(errors) {
        return this.error.record(errors.errors);
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
    
    reset(field) {
        if (field) {
            return this.fields[field] = '';
        }

        for (let field in this.fields) {
            this.fields[field] = '';
        }
    }

    loadFiles(name, files) {
        if (!files || !files.length) return;

        return this.files.append(name, files[0]);
    }

    getLoadedFiles() {
        if (this.filesCount(this.files) > 0) {
            for (let field in this.fields) {
                this.files.append(field, this.fields[field]);
            }

            return this.files;
        }

        return this.fields;
    }

    filesCount(files) {
        let entries = []
        for (let entrie of files.entries()) {
            entries.push(entrie);
        }
        let length = entries.length;

        entries = []
        return length;
    }
}