#jorge.form

Installation and Ussage:
  1. npm install https://github.com/Yismen/dainsys-form.git --save
  2. move it to your vendor folder
  3. import it in your component 'path/vendor/dainsys-form'

Bind the model by adding the name and v-model attributes to your form fields:
  1. name="card"
  2. v-model="form.fields.card"

Working with Files:
  1. Add the following directive to you vue form: 
  1.1 enctype="multipart/form-data" 
  1.2 @change="form.loadFiles($event.target.name, $event.target.files)"

To Display Errors, add the following span:
  1. Add a span, with class="text-danger"
  2. Add the following directive: v-if="form.error.has('name')" v-text="form.error.get('name')"

To remove the errors while the field changes, add the following directive to you form:
  - @keydown="form.error.clear($event.target.name)" or @change="form.error.clear($event.target.name)"

