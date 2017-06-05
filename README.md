#jorge.form

Installation:
  1. npm install https://github.com/Yismen/jorge.form.git

Use:
  1. In your component, use import Form from 'jorge.form';
  2. Make sure you use one of the resource libraries, most prefered axios.

  3. Assign that library to vue by declaring Vue.http = axios (or any other library)

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
  1. @keydown="form.error.clear($event.target.name)"

