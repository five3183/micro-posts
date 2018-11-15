class UI {
   constructor() {
      this.post = document.getElementById('posts')
      this.titleInput = document.getElementById('title')
      this.bodyInput = document.getElementById('body')
      this.idInput = document.getElementById('id')
      this.postSubmit = document.getElementById('post-submit')
      this.formState = 'add'
   }
   showPosts(posts) {
      let output = ''

      posts.forEach(post => {
         output += `
            <div class="card mb-3">
               <div class="card-body post-cards">
                  <h4 class="card-title">${post.title}</h4>
                  <p class="card-text">${post.body}</p>
                  <a href="#" class="edit card-link" data-id="${post.id}">
                     <i class="fa fa-pencil"></i>
                  </a>
                  <a href="#" class="delete card-link" data-id="${post.id}">
                     <i class="fa fa-remove"></i>
                  </a>
               </div>
            </div>
         `
      })
      this.post.innerHTML = output
   }
   changeFormState(type) {
      if(type === 'edit') {
         // Check to see if cancel button was removed
         if(document.getElementById('cancel-btn')) {
            document.getElementById('cancel-btn').remove()
         }

         // Change post button to edit button
         this.postSubmit.textContent = 'Update Post'
         this.postSubmit.className = 'btn btn-warning btn-block'

         // Create a cancel button
         const button = document.createElement('button')
         button.id = 'cancel-btn'
         button.className = 'btn btn-light btn-block'
         button.appendChild(document.createTextNode('Cancel'))
         
         // Get parent element
         const cardForm = document.getElementById('card-form')
         
         //Get element to submit before
         const formEnd = document.getElementById('form-end')

         cardForm.insertBefore(button, formEnd)

         const cancelBtn = document.getElementById('cancel-btn')
         cancelBtn.addEventListener('click', () => {
            this.changeFormState('cancel')
            cancelBtn.remove()
         })
      } else {
         // Check to see if cancel button was removed, if not remove it.
         if(document.getElementById('cancel-btn')) {
            document.getElementById('cancel-btn').remove()
         }

         // Change button back to post button
         this.postSubmit.textContent = 'Post It'
         this.postSubmit.className = 'btn btn-primary btn-block'
         
         // Clear hidden id field value
         this.idInput.value = ''
         this.clearFields()
      }
   }
   fillForm (data) {
      console.log(data)
      this.titleInput.value = data.title
      this.bodyInput.value = data.body
      this.idInput.value = data.id

      this.changeFormState('edit')
   }
   showAlert (message, className) {
      this.clearAlert()

      // Create element
      const div = document.createElement('div')
      div.className = className
      div.appendChild(document.createTextNode(message))

      // Get target parent element
      const container = document.getElementById('post-container')
      const posts = document.getElementById('posts')

      container.insertBefore(div, posts)

      setTimeout(() => {
         this.clearAlert()
      }, 3000)
      
   }
   
   clearAlert () {
      const alert = document.querySelector('.alert')
      if(alert) {
         alert.remove()
      }
   }
   
   clearFields() {
      this.titleInput.value = ''
      this.bodyInput.value = ''
   }
}

export const ui = new UI