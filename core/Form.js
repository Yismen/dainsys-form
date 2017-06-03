import Error from './Error.js';
import Notify from 'v-toast'

export default class Form {
    constructor (data, clear = true) {

        this.clearForm = clear;

        this.originalData = data;
        this.fields = {}
        this.files = new FormData()

        for (let field in data) {
            this.fields[field] = data[field];
        }

        this.error = new Error();
        this.notify = Notify;
        this.http = Vue.http;
    }

    submit(requestType, url) {

        requestType = requestType.toLowerCase();

        return new Promise((resolve, reject) => {

            this.notify.loading({message: 'Loading. Please wait!', duration: 0});

            this.fields = this.getLoadedFiles();

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

        if (this.clearForm) {
            this.reset();
        }        

        this.notify.success({message: 'Great! Operation successful.', duration: 3000});
    }

    onFail(errors) {
        this.notify.error({message: 'Oups! The form have errors...', duration: 500});

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
            this.resetField(field);
        }

        for(let field in this.fields) {
            this.fields[field] = '';
        }
    }

    loadFiles(name, files) {
        if (!files || !files.length) return;

        return this.files.append(name, files[0]);
    }
    
    getLoadedFiles () {
        if (this.filesCount(this.files) > 0) {
            for(let field in this.fields) {
                this.files.append(field, this.fields[field]);
            }

            return this.files;
        }

        return this.fields;
    }

    filesCount(files) {
        let entries = []
        for(let entrie of files.entries()) {
            entries.push(entrie);
        }
        let length = entries.length;

        entries = []
        return length;        
    }
}
