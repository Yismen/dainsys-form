# jorge.form
#
# Installation:
# npm install https://github.com/Yismen/jorge.form.git
#
# Use:
# In your component, use import Form from 'jorge.form';

# Make sure you use one of the resource libraries, most prefered axios.

# Assign that library to vue by declaring Vue.http = axios (or any other library)

# Bind the model by adding the name and v-model attributes to your form fields:
#       name="card"
#       v-model="form.fields.card"

# Working with Files:
#     Add the following directive to you vue form: 
#         enctype="multipart/form-data" 
#         @change="form.loadFiles($event.target.name, $event.target.files)"

# To Display Errors:
#         <span class="text-danger" v-if="form.error.has('name')">{{ form.error.get('name') }}</span>

# To remove the errors while the field changes, add the following directive to you form:
#         @keydown="form.error.clear($event.target.name)"

