import { http } from './http'
import { ui } from './ui'

const submitPost = document.getElementById('post-submit')
const postContainer = document.getElementById('posts')

const getPosts = () => {
	http.get('http://localhost:3000/posts')
		.then(data => ui.showPosts(data))
		.catch(err => console.log(err))
}

const addPost = () => {
	const id = document.getElementById('id').value
	const title = document.getElementById('title').value
	const body = document.getElementById('body').value

	const data = {
		title, 
		body
	}
	if(title === '' || body === '') {
		ui.showAlert('All fields are required!', 'alert alert-danger')
	} else {
		if(id === '') {
			http.post('http://localhost:3000/posts', data)
				.then(data => {
					ui.showAlert('Post Added!', 'alert alert-success')
					ui.clearFields()
					getPosts()
				})
				.catch(err => console.log(err))
		} else {
			http.put(`http://localhost:3000/posts/${id}`, data)
				.then(data => {
					ui.showAlert('Post Updated!', 'alert alert-success')
					ui.changeFormState('add')
					getPosts()
				})
				.catch(err => console.log(err))
		}
	}
}

const deletePost = (e) => {
	if(e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id
		if(confirm('Are you sure?')) {
			http.delete(`http://localhost:3000/posts/${id}`)
				.then(data => {
					ui.showAlert('Post Removed!', 'alert alert-success')
					getPosts()
				})
				.catch(err => console.log(err))
		}
	}

	e.preventDefault()
}
const enableEdit = (e) => {
	if(e.target.parentElement.classList.contains('edit')) {
		const id = e.target.parentElement.dataset.id

		const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent

		const body = e.target.parentElement.previousElementSibling.textContent

		const data = {
			id, 
			title,
			body
		}
		ui.fillForm(data)
	}

}

document.addEventListener('DOMContentLoaded', getPosts)

// Listen for add posts
submitPost.addEventListener('click', addPost)

// Listen for delete
postContainer.addEventListener('click', deletePost)

// Listen for edit state
postContainer.addEventListener('click', enableEdit)